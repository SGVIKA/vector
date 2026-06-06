// src/time-block/time-block.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { TimeBlockService } from './time-block.service';
import { PrismaService } from '../prisma.service';
import { TimeBlockDto } from './dto/time-block.dto';

describe('TimeBlockService', () => {
  let service: TimeBlockService;
  let prisma: PrismaService;

  // Мок-объект для PrismaService
  const mockPrismaService = {
    timeBlock: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeBlockService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TimeBlockService>(TimeBlockService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('должен вернуть все временные блоки пользователя, отсортированные по order', async () => {
      const userId = 'user123';
      const mockBlocks = [
        { id: '1', name: 'Блок 1', color: '#ff0000', duration: 60, order: 0, userId },
        { id: '2', name: 'Блок 2', color: '#00ff00', duration: 30, order: 1, userId },
        { id: '3', name: 'Блок 3', color: '#0000ff', duration: 90, order: 2, userId },
      ];

      mockPrismaService.timeBlock.findMany.mockResolvedValue(mockBlocks);

      const result = await service.getAll(userId);

      expect(mockPrismaService.timeBlock.findMany).toHaveBeenCalledWith({
        where: { userId },
        orderBy: { order: 'asc' },
      });
      expect(result).toEqual(mockBlocks);
      expect(result[0].order).toBeLessThan(result[1].order);
    });

    it('должен вернуть пустой массив, если у пользователя нет блоков', async () => {
      const userId = 'user456';

      mockPrismaService.timeBlock.findMany.mockResolvedValue([]);

      const result = await service.getAll(userId);

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('должен создать новый временной блок', async () => {
      const userId = 'user123';
      const dto: TimeBlockDto = {
        name: 'Работа',
        color: '#ff0000',
        duration: 60,
        order: 0,
      };
      const createdBlock = { id: 'new1', ...dto, userId };

      mockPrismaService.timeBlock.create.mockResolvedValue(createdBlock);

      const result = await service.create(dto, userId);

      expect(mockPrismaService.timeBlock.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          user: { connect: { id: userId } },
        },
      });
      expect(result).toEqual(createdBlock);
    });

    it('должен создать блок без указания цвета (используется значение по умолчанию)', async () => {
      const userId = 'user123';
      const dto: TimeBlockDto = {
        name: 'Отдых',
        duration: 30,
        order: 1,
      };
      const createdBlock = { id: 'new2', name: 'Отдых', duration: 30, order: 1, userId };

      mockPrismaService.timeBlock.create.mockResolvedValue(createdBlock);

      const result = await service.create(dto, userId);

      expect(mockPrismaService.timeBlock.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          user: { connect: { id: userId } },
        },
      });
      expect(result).toEqual(createdBlock);
    });
  });

  describe('update', () => {
    it('должен обновить существующий временной блок', async () => {
      const timeBlockId = 'block123';
      const userId = 'user123';
      const dto = { name: 'Обновлённый блок', duration: 120 };
      const updatedBlock = {
        id: timeBlockId,
        name: 'Обновлённый блок',
        color: '#ff0000',
        duration: 120,
        order: 0,
        userId,
      };

      mockPrismaService.timeBlock.update.mockResolvedValue(updatedBlock);

      const result = await service.update(dto, timeBlockId, userId);

      expect(mockPrismaService.timeBlock.update).toHaveBeenCalledWith({
        where: { userId, id: timeBlockId },
        data: dto,
      });
      expect(result).toEqual(updatedBlock);
      expect(result.name).toBe('Обновлённый блок');
      expect(result.duration).toBe(120);
    });

    it('должен обновить только цвет блока', async () => {
      const timeBlockId = 'block123';
      const userId = 'user123';
      const dto = { color: '#00ff00' };
      const updatedBlock = {
        id: timeBlockId,
        name: 'Работа',
        color: '#00ff00',
        duration: 60,
        order: 0,
        userId,
      };

      mockPrismaService.timeBlock.update.mockResolvedValue(updatedBlock);

      const result = await service.update(dto, timeBlockId, userId);

      expect(mockPrismaService.timeBlock.update).toHaveBeenCalledWith({
        where: { userId, id: timeBlockId },
        data: dto,
      });
      expect(result.color).toBe('#00ff00');
    });
  });

  describe('delete', () => {
    it('должен удалить временной блок пользователя', async () => {
      const timeBlockId = 'block123';
      const userId = 'user123';
      const deletedBlock = {
        id: timeBlockId,
        name: 'Удалённый блок',
        color: '#ff0000',
        duration: 60,
        order: 0,
        userId,
      };

      mockPrismaService.timeBlock.delete.mockResolvedValue(deletedBlock);

      const result = await service.delete(timeBlockId, userId);

      expect(mockPrismaService.timeBlock.delete).toHaveBeenCalledWith({
        where: { id: timeBlockId, userId },
      });
      expect(result).toEqual(deletedBlock);
    });
  });

  describe('updateOrder', () => {
    it('должен обновить порядок блоков с помощью транзакции', async () => {
      const ids = ['block1', 'block2', 'block3'];
      const expectedCalls = ids.map((id, index) => ({
        where: { id },
        data: { order: index },
      }));

      // Мокаем каждый update в транзакции
      const mockUpdates = ids.map((id, index) => ({
        id,
        order: index,
      }));

      mockPrismaService.$transaction.mockResolvedValue(mockUpdates);

      const result = await service.updateOrder(ids);

      // Проверяем, что $transaction был вызван с массивом промисов
      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.$transaction).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.any(Promise),
          expect.any(Promise),
          expect.any(Promise),
        ])
      );
      expect(result).toEqual(mockUpdates);
    });

    it('должен корректно обработать пустой массив ids', async () => {
      const ids: string[] = [];

      mockPrismaService.$transaction.mockResolvedValue([]);

      const result = await service.updateOrder(ids);

      expect(mockPrismaService.$transaction).toHaveBeenCalledWith([]);
      expect(result).toEqual([]);
    });

    it('должен корректно обработать один элемент в массиве', async () => {
      const ids = ['block1'];
      const mockUpdates = [{ id: 'block1', order: 0 }];

      mockPrismaService.$transaction.mockResolvedValue(mockUpdates);

      const result = await service.updateOrder(ids);

      expect(mockPrismaService.$transaction).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUpdates);
    });

    it('должен выбросить ошибку при невалидных id', async () => {
      const ids = ['invalid1', 'invalid2'];

      mockPrismaService.$transaction.mockRejectedValue(
        new Error('Record to update not found')
      );

      await expect(service.updateOrder(ids)).rejects.toThrow();
    });
  });
});