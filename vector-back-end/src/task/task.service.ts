import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({
			where: {
				userId
			},
			orderBy: [{ priority: 'desc' }]
		})
	}

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

	async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: {
				id: taskId,
				userId
			},
			data: dto
		})
	}

	async delete(taskId: string, userId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId,
				userId
			}
		})
	}
}
