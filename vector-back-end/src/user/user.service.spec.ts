// src/user/user.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { UserDto } from './user.dto';
import { hash } from 'argon2';
import { startOfDay, subDays } from 'date-fns';

// Мок для argon2.hash
jest.mock('argon2', () => ({
  hash: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  // Мок-объект для PrismaService
  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    task: {
      count: jest.fn(),
    },
    note: {
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('должен вернуть пользователя по id с его заметками и задачами', async () => {
      const userId = 'user123';
      const mockUser = {
        id: userId,
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashed',
        notes: [{ id: 'note1' }],
        tasks: [{ id: 'task1' }],
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getById(userId);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { notes: true, tasks: true },
      });
      expect(result).toEqual(mockUser);
    });

    it('должен вернуть null, если пользователь не найден', async () => {
      const userId = 'notfound';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.getById(userId);

      expect(result).toBeNull();
    });
  });

  describe('getByEmail', () => {
    it('должен вернуть пользователя по email', async () => {
      const email = 'test@test.com';
      const mockUser = {
        id: 'user123',
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashed',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getByEmail(email);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual(mockUser);
    });

    it('должен вернуть null, если пользователь с таким email не найден', async () => {
      const email = 'notfound@test.com';

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.getByEmail(email);

      expect(result).toBeNull();
    });
  });

  describe('getProfile', () => {
    const userId = 'user123';
    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    it('должен вернуть профиль пользователя со статистикой', async () => {
      const mockUser = {
        id: userId,
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashedPassword',
        notes: [{ id: 'note1' }, { id: 'note2' }],
        tasks: [{ id: 'task1' }, { id: 'task2' }, { id: 'task3' }],
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.task.count.mockResolvedValueOnce(2);  // completedTasks
      mockPrismaService.task.count.mockResolvedValueOnce(1);  // todayTasks
      mockPrismaService.task.count.mockResolvedValueOnce(5);  // weekTasks
      mockPrismaService.note.count.mockResolvedValueOnce(1);  // todayNotes
      mockPrismaService.note.count.mockResolvedValueOnce(3);  // weekNotes

      const result = await service.getProfile(userId);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { notes: true, tasks: true },
      });

      // Проверка статистики задач
      expect(result.statistics.tasks).toEqual([
        { label: 'Всего задач', value: 3 },
        { label: 'Выполнено', value: 2 },
        { label: 'Задачи сегодня', value: 1 },
        { label: 'Задачи за неделю', value: 5 },
      ]);

      // Проверка статистики заметок
      expect(result.statistics.notes).toEqual([
        { label: 'Всего заметок', value: 2 },
        { label: 'Заметки сегодня', value: 1 },
        { label: 'Заметки за неделю', value: 3 },
      ]);

      // Проверка, что пароль не возвращается
      expect(result.user).not.toHaveProperty('password');
    });

    it('должен корректно обработать нулевые значения статистики', async () => {
      const mockUser = {
        id: userId,
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashedPassword',
        notes: [],
        tasks: [],
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.task.count.mockResolvedValue(0);
      mockPrismaService.note.count.mockResolvedValue(0);

      const result = await service.getProfile(userId);

      expect(result.statistics.tasks).toEqual([
        { label: 'Всего задач', value: 0 },
        { label: 'Выполнено', value: 0 },
        { label: 'Задачи сегодня', value: 0 },
        { label: 'Задачи за неделю', value: 0 },
      ]);

      expect(result.statistics.notes).toEqual([
        { label: 'Всего заметок', value: 0 },
        { label: 'Заметки сегодня', value: 0 },
        { label: 'Заметки за неделю', value: 0 },
      ]);
    });
  });

  describe('create', () => {
    it('должен создать нового пользователя с хешированным паролем', async () => {
      const dto: AuthDto = { email: 'new@test.com', password: '123456' };
      const hashedPassword = 'hashedPassword123';
      const createdUser = {
        id: 'user456',
        email: dto.email,
        name: '',
        password: hashedPassword,
      };

      (hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.create(dto);

      expect(hash).toHaveBeenCalledWith(dto.password);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: dto.email,
          name: '',
          password: hashedPassword,
        },
      });
      expect(result).toEqual(createdUser);
    });
  });

  describe('update', () => {
    const userId = 'user123';

    it('должен обновить пользователя без изменения пароля', async () => {
      const dto: UserDto = { email: 'updated@test.com', name: 'Updated Name' };
      const updatedUser = {
        id: userId,
        email: 'updated@test.com',
        name: 'Updated Name',
        password: 'oldHashedPassword',
      };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, dto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: dto,
      });
      expect(result).toEqual(updatedUser);
    });

    it('должен обновить пользователя с новым паролем (хешировать его)', async () => {
      const dto: UserDto = {
        email: 'updated@test.com',
        name: 'Updated Name',
        password: 'newPassword123',
      };
      const hashedPassword = 'newHashedPassword';
      const updatedUser = {
        id: userId,
        email: 'updated@test.com',
        name: 'Updated Name',
        password: hashedPassword,
      };

      (hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, dto);

      expect(hash).toHaveBeenCalledWith('newPassword123');
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          ...dto,
          password: hashedPassword,
        },
      });
      expect(result).toEqual(updatedUser);
    });

    it('должен обновить только имя пользователя', async () => {
      const dto: UserDto = { name: 'Just Name' };
      const updatedUser = {
        id: userId,
        email: 'old@test.com',
        name: 'Just Name',
        password: 'oldHashed',
      };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, dto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: dto,
      });
      expect(result.name).toBe('Just Name');
      expect(result.email).toBe('old@test.com');
    });
  });
});