// src/auth/auth.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';

// Мок для argon2.verify
jest.mock('argon2', () => ({
  verify: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  const mockJwtService = {
    sign: jest.fn(),
    verifyAsync: jest.fn(),
  };

  const mockUserService = {
    getByEmail: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('должен успешно войти с валидными данными', async () => {
      const dto: AuthDto = { email: 'test@test.com', password: '123456' };
      const mockUser = {
        id: 'user123',
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(mockUser);
      (verify as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValueOnce('access123').mockReturnValueOnce('refresh123');

      const result = await service.login(dto);

      expect(mockUserService.getByEmail).toHaveBeenCalledWith(dto.email);
      expect(verify).toHaveBeenCalled();
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken', 'access123');
      expect(result).toHaveProperty('refreshToken', 'refresh123');
      expect(result.user).not.toHaveProperty('password');
    });

    it('должен выбросить NotFoundException если пользователь не найден', async () => {
      const dto: AuthDto = { email: 'notfound@test.com', password: '123456' };

      mockUserService.getByEmail.mockResolvedValue(null);

      await expect(service.login(dto)).rejects.toThrow(NotFoundException);
      expect(mockUserService.getByEmail).toHaveBeenCalledWith(dto.email);
      expect(verify).not.toHaveBeenCalled();
    });

    it('должен выбросить UnauthorizedException если пароль неверный', async () => {
      const dto: AuthDto = { email: 'test@test.com', password: 'wrong' };
      const mockUser = {
        id: 'user123',
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(mockUser);
      (verify as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('должен успешно зарегистрировать нового пользователя', async () => {
      const dto: AuthDto = { email: 'new@test.com', password: '123456' };
      const mockCreatedUser = {
        id: 'user456',
        email: 'new@test.com',
        password: 'hashedPassword',
        name: 'New User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(null);
      mockUserService.create.mockResolvedValue(mockCreatedUser);
      mockJwtService.sign.mockReturnValueOnce('access456').mockReturnValueOnce('refresh456');

      const result = await service.register(dto);

      expect(mockUserService.getByEmail).toHaveBeenCalledWith(dto.email);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('accessToken', 'access456');
      expect(result.user).not.toHaveProperty('password');
    });

    it('должен выбросить BadRequestException если пользователь уже существует', async () => {
      const dto: AuthDto = { email: 'existing@test.com', password: '123456' };
      const existingUser = {
        id: 'user1',
        email: 'existing@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(existingUser);

      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  });

  describe('getNewTokens', () => {
    it('должен успешно обновить токены по refreshToken', async () => {
      const refreshToken = 'validRefreshToken';
      const decodedToken = { id: 'user123' };
      const mockFullUser = {
        id: 'user123',
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockJwtService.verifyAsync.mockResolvedValue(decodedToken);
      mockUserService.getById.mockResolvedValue(mockFullUser);
      mockJwtService.sign.mockReturnValueOnce('newAccessToken').mockReturnValueOnce('newRefreshToken');

      const result = await service.getNewTokens(refreshToken);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(refreshToken);
      expect(mockUserService.getById).toHaveBeenCalledWith(decodedToken.id);
      expect(mockJwtService.sign).toHaveBeenCalledTimes(2);
      expect(result).toHaveProperty('accessToken', 'newAccessToken');
      expect(result).toHaveProperty('refreshToken', 'newRefreshToken');
      expect(result.user).not.toHaveProperty('password');
    });

    it('должен выбросить ошибку если refreshToken невалидный', async () => {
      const refreshToken = 'invalidToken';

      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      // Проверяем, что метод выбрасывает ЛЮБУЮ ошибку
      await expect(service.getNewTokens(refreshToken)).rejects.toThrow();
    });

    it('должен выбросить ошибку если пользователь не найден', async () => {
      const refreshToken = 'validRefreshToken';
      const decodedToken = { id: 'notfound' };

      mockJwtService.verifyAsync.mockResolvedValue(decodedToken);
      mockUserService.getById.mockResolvedValue(null);

      // Проверяем, что метод выбрасывает ЛЮБУЮ ошибку
      await expect(service.getNewTokens(refreshToken)).rejects.toThrow();
    });
  });

  describe('issueTokens (private метод, тестируем через публичные методы)', () => {
    it('должен корректно выпускать access и refresh токены', async () => {
      const dto: AuthDto = { email: 'test@test.com', password: '123456' };
      const mockUser = {
        id: 'user123',
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(mockUser);
      (verify as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValueOnce('accessToken').mockReturnValueOnce('refreshToken');

      const result = await service.login(dto);

      expect(mockJwtService.sign).toHaveBeenNthCalledWith(1, { id: mockUser.id }, { expiresIn: '1h' });
      expect(mockJwtService.sign).toHaveBeenNthCalledWith(2, { id: mockUser.id }, { expiresIn: '7d' });
      expect(result.accessToken).toBe('accessToken');
      expect(result.refreshToken).toBe('refreshToken');
    });
  });

  describe('addRefreshTokenToResponse', () => {
    it('должен установить cookie с refreshToken', () => {
      const res = mockResponse() as Response;
      const refreshToken = 'refresh123';

      service.addRefreshTokenToResponse(res, refreshToken);

      expect(res.cookie).toHaveBeenCalledWith(
        service.REFRESH_TOKEN_NAME,
        refreshToken,
        expect.objectContaining({
          httpOnly: true,
          domain: 'localhost',
          secure: true,
          sameSite: 'none',
        })
      );
    });
  });

  describe('removeRefreshTokenFromResponse', () => {
    it('должен очистить cookie с refreshToken', () => {
      const res = mockResponse() as Response;

      service.removeRefreshTokenFromResponse(res);

      expect(res.cookie).toHaveBeenCalledWith(
        service.REFRESH_TOKEN_NAME,
        '',
        expect.objectContaining({
          httpOnly: true,
          domain: 'localhost',
          expires: expect.any(Date),
          secure: true,
          sameSite: 'none',
        })
      );
    });
  });
});