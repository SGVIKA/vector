// src/note/note.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { PrismaService } from '../prisma.service';
import { NoteDto } from './note.dto';
import { QueryDto } from '../dto/query.dto';

describe('NoteService', () => {
  let service: NoteService;
  let prisma: PrismaService;

  // Мок-объект для PrismaService
  const mockPrismaService = {
    note: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('должен вернуть все заметки пользователя', async () => {
      const userId = 'user123';
      const mockNotes = [
        { id: '1', title: 'Заметка 1', text: 'Текст 1', userId, createdAt: new Date() },
        { id: '2', title: 'Заметка 2', text: 'Текст 2', userId, createdAt: new Date() },
      ];

      mockPrismaService.note.findMany.mockResolvedValue(mockNotes);

      const result = await service.getAll(userId);

      expect(mockPrismaService.note.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: [{ createdAt: 'desc' }],
      });
      expect(result).toEqual(mockNotes);
    });

    it('должен вернуть пустой массив, если у пользователя нет заметок', async () => {
      const userId = 'user456';

      mockPrismaService.note.findMany.mockResolvedValue([]);

      const result = await service.getAll(userId);

      expect(result).toEqual([]);
    });
  });

  describe('getWithFilter', () => {
    it('должен вернуть заметки с пагинацией без поиска', async () => {
      const userId = 'user123';
      const query: QueryDto = { page: 1, limit: 5 };
      const mockNotes = [
        { id: '1', title: 'Заметка 1', text: 'Текст 1', userId },
        { id: '2', title: 'Заметка 2', text: 'Текст 2', userId },
      ];

      mockPrismaService.note.findMany.mockResolvedValue(mockNotes);
      mockPrismaService.note.count.mockResolvedValue(10);

      const result = await service.getWithFilter(query, userId);

      expect(mockPrismaService.note.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 5,
      });
      expect(mockPrismaService.note.count).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual({
        data: mockNotes,
        pagination: {
          total: 10,
          page: 1,
          limit: 5,
          hasMore: true,
        },
      });
    });

    it('должен вернуть заметки с поиском по заголовку', async () => {
      const userId = 'user123';
      const query: QueryDto = { page: 1, limit: 10, search: 'важно' };
      const mockNotes = [
        { id: '1', title: 'Важная заметка', text: 'Текст', userId },
      ];

      mockPrismaService.note.findMany.mockResolvedValue(mockNotes);
      mockPrismaService.note.count.mockResolvedValue(1);

      const result = await service.getWithFilter(query, userId);

      expect(mockPrismaService.note.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          OR: [
            { title: { contains: 'важно', mode: 'insensitive' } },
            { text: { contains: 'важно', mode: 'insensitive' } },
          ],
        },
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 10,
      });
      expect(result.pagination.total).toBe(1);
      expect(result.pagination.hasMore).toBe(false);
    });

    it('должен корректно обработать поиск по тексту', async () => {
      const userId = 'user123';
      const query: QueryDto = { search: 'секретно' };

      mockPrismaService.note.findMany.mockResolvedValue([]);
      mockPrismaService.note.count.mockResolvedValue(0);

      await service.getWithFilter(query, userId);

      expect(mockPrismaService.note.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          OR: [
            { title: { contains: 'секретно', mode: 'insensitive' } },
            { text: { contains: 'секретно', mode: 'insensitive' } },
          ],
        },
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 10,
      });
    });

    it('должен использовать значения по умолчанию для page и limit', async () => {
      const userId = 'user123';
      const query: QueryDto = {};

      mockPrismaService.note.findMany.mockResolvedValue([]);
      mockPrismaService.note.count.mockResolvedValue(0);

      await service.getWithFilter(query, userId);

      expect(mockPrismaService.note.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: [{ createdAt: 'desc' }],
        skip: 0,
        take: 10,
      });
    });

    it('должен корректно рассчитать hasMore для последней страницы', async () => {
      const userId = 'user123';
      const query: QueryDto = { page: 2, limit: 5 };

      mockPrismaService.note.findMany.mockResolvedValue([]);
      mockPrismaService.note.count.mockResolvedValue(10); // всего 10 записей

      const result = await service.getWithFilter(query, userId);

      // page 2, limit 5: offset = 5, limit = 5, total = 10, offset + limit = 10
      // hasMore = 10 < 10 ? false
      expect(result.pagination.hasMore).toBe(false);
    });
  });

  describe('getById', () => {
    it('должен вернуть заметку по id', async () => {
      const noteId = 'note123';
      const userId = 'user123';
      const mockNote = { id: noteId, title: 'Заметка', text: 'Текст', userId };

      mockPrismaService.note.findFirst.mockResolvedValue(mockNote);

      const result = await service.getById(noteId, userId);

      expect(mockPrismaService.note.findFirst).toHaveBeenCalledWith({
        where: { userId, id: noteId },
      });
      expect(result).toEqual(mockNote);
    });

    it('должен вернуть null, если заметка не найдена', async () => {
      const noteId = 'notfound';
      const userId = 'user123';

      mockPrismaService.note.findFirst.mockResolvedValue(null);

      const result = await service.getById(noteId, userId);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('должен создать новую заметку', async () => {
      const userId = 'user123';
      const dto: NoteDto = { title: 'Новая заметка', text: 'Текст заметки' };
      const createdNote = { id: 'new1', ...dto, userId, createdAt: new Date() };

      mockPrismaService.note.create.mockResolvedValue(createdNote);

      const result = await service.create(dto, userId);

      expect(mockPrismaService.note.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          user: { connect: { id: userId } },
        },
      });
      expect(result).toEqual(createdNote);
    });

    it('должен создать заметку без текста', async () => {
      const userId = 'user123';
      const dto: NoteDto = { title: 'Заметка без текста' };
      const createdNote = { id: 'new2', title: 'Заметка без текста', text: null, userId };

      mockPrismaService.note.create.mockResolvedValue(createdNote);

      const result = await service.create(dto, userId);

      expect(mockPrismaService.note.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          user: { connect: { id: userId } },
        },
      });
      expect(result).toEqual(createdNote);
    });
  });

  describe('update', () => {
    it('должен обновить существующую заметку', async () => {
      const noteId = 'note123';
      const userId = 'user123';
      const dto = { title: 'Обновлённый заголовок' };
      const updatedNote = { id: noteId, title: 'Обновлённый заголовок', text: 'Старый текст', userId };

      mockPrismaService.note.update.mockResolvedValue(updatedNote);

      const result = await service.update(dto, noteId, userId);

      expect(mockPrismaService.note.update).toHaveBeenCalledWith({
        where: { userId, id: noteId },
        data: dto,
      });
      expect(result).toEqual(updatedNote);
    });
  });

  describe('delete', () => {
    it('должен удалить заметку пользователя', async () => {
      const noteId = 'note123';
      const userId = 'user123';
      const deletedNote = { id: noteId, title: 'Удалённая заметка', text: 'Текст', userId };

      mockPrismaService.note.delete.mockResolvedValue(deletedNote);

      const result = await service.delete(noteId, userId);

      expect(mockPrismaService.note.delete).toHaveBeenCalledWith({
        where: { id: noteId, userId },
      });
      expect(result).toEqual(deletedNote);
    });
  });
});