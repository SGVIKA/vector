import { PrismaService } from '../prisma.service'
import { TaskService } from './task.service'
import { Test, TestingModule } from '@nestjs/testing'
import { TaskDto } from './task.dto'

// Мок-объект для PrismaService (заменяет реальную БД)
const mockPrismaService = {
	task: {
		findMany: jest.fn(), // мок для получения списка
		create: jest.fn(), // мок для создания
		update: jest.fn(), // мок для обновления
		delete: jest.fn() // мок для удаления
	}
}

describe('TaskService', () => {
	let service: TaskService
	let prisma: PrismaService

	// Настройка перед каждым тестом
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TaskService,
				{
					provide: PrismaService, // подменяем реальный PrismaService на мок
					useValue: mockPrismaService
				}
			]
		}).compile()

		service = module.get<TaskService>(TaskService)
		prisma = module.get<PrismaService>(PrismaService)
	})

	// Очистка моков после каждого теста
	afterEach(() => {
		jest.clearAllMocks()
	})

	// ==================== ТЕСТЫ ДЛЯ getAll ====================
	describe('getAll', () => {
		it('должен вернуть только задачи конкретного пользователя', async () => {
			const userId = 'user123'
			const mockTasks = [
				{ id: '1', text: 'Задача 1', priority: 'high', userId },
				{ id: '2', text: 'Задача 2', priority: 'low', userId }
			]

			mockPrismaService.task.findMany.mockResolvedValue(mockTasks)

			const result = await service.getAll(userId)

			expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
				where: { userId },
				orderBy: [{ createdAt: 'desc' }, { priority: 'desc' }]
			})
			expect(result).toEqual(mockTasks)
			expect(result.every(task => task.userId === userId)).toBe(true)
		})

		it('должен вернуть пустой массив, если у пользователя нет задач', async () => {
			const userId = 'user456'

			mockPrismaService.task.findMany.mockResolvedValue([])

			const result = await service.getAll(userId)

			expect(result).toEqual([])
			expect(mockPrismaService.task.findMany).toHaveBeenCalledWith({
				where: { userId },
				orderBy: [{ createdAt: 'desc' }, { priority: 'desc' }]
			})
		})
	})

	// ==================== ТЕСТЫ ДЛЯ create ====================
	describe('create', () => {
		it('должен создать новую задачу для пользователя', async () => {
			const userId = 'user123'
			const dto: TaskDto = { text: 'Новая задача', priority: 'high' }
			const createdTask = { id: 'new1', ...dto, userId }

			mockPrismaService.task.create.mockResolvedValue(createdTask)

			const result = await service.create(dto, userId)

			expect(mockPrismaService.task.create).toHaveBeenCalledWith({
				data: {
					...dto,
					user: { connect: { id: userId } }
				}
			})
			expect(result).toEqual(createdTask)
		})
	})

	// ==================== ТЕСТЫ ДЛЯ update ====================
	describe('update', () => {
		it('должен обновить существующую задачу', async () => {
			const taskId = 'task1'
			const userId = 'user123'
			const dto = { text: 'Обновлённая задача' }
			const updatedTask = {
				id: taskId,
				text: 'Обновлённая задача',
				priority: 'medium',
				userId
			}

			mockPrismaService.task.update.mockResolvedValue(updatedTask)

			const result = await service.update(dto, taskId, userId)

			expect(mockPrismaService.task.update).toHaveBeenCalledWith({
				where: { id: taskId, userId },
				data: dto
			})
			expect(result).toEqual(updatedTask)
		})
	})

	// ==================== ТЕСТЫ ДЛЯ delete ====================
	describe('delete', () => {
		it('должен удалить задачу', async () => {
			const taskId = 'task1'
			const userId = 'user123'
			const deletedTask = { id: taskId, text: 'Удалённая задача', userId }

			mockPrismaService.task.delete.mockResolvedValue(deletedTask)

			const result = await service.delete(taskId, userId)

			expect(mockPrismaService.task.delete).toHaveBeenCalledWith({
				where: { id: taskId, userId }
			})
			expect(result).toEqual(deletedTask)
		})
	})
})
