import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  /**
   * Получение всех задач пользователя
   * @param userId - идентификатор пользователя
   * @returns массив задач, отсортированный по приоритету (от высокого к низкому)
   *          и по дате (сначала ближайшие)
   */
  async getAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' }
      ]
    })
  }

  /**
   * Создание новой задачи
   * @param dto - данные задачи
   * @param userId - идентификатор пользователя-владельца
   * @returns созданная задача
   */
  async create(dto: TaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  /**
   * Обновление существующей задачи
   * @param dto - обновляемые данные задачи
   * @param taskId - идентификатор обновляемой задачи
   * @param userId - идентификатор пользователя
   * @returns обновлённая задача
   */
  async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
    return this.prisma.task.update({
      where: {
        id: taskId,
        userId
      },
      data: dto
    })
  }

  /**
   * Удаление задачи
   * @param taskId - идентификатор удаляемой задачи
   * @param userId - идентификатор пользователя
   * @returns удалённая задача
   */
  async delete(taskId: string, userId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
        userId
      }
    })
  }
}