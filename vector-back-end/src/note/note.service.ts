import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { NoteDto } from './note.dto'
import { QueryDto } from 'src/dto/query.dto'
import { title } from 'process'
import { contains } from 'class-validator'

@Injectable()
export class NoteService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.note.findMany({
			where: { userId },
			orderBy: [{ createdAt: 'desc' }]
		})
	}

	async getWithFilter(query: QueryDto, userId: string) {
		const page = Number(query.page) || 1
		const limit = Number(query.limit) || 10
		const offset = (page - 1) * limit
		const search = query.search?.trim()

		const where: any = { userId }

		if (search) {
			where.OR = [
				{ title: { contains: search, mode: 'insensitive' } },
				{ text: { contains: search, mode: 'insensitive' } }
			]
		}

		const [data, total] = await Promise.all([
			this.prisma.note.findMany({
				where,
				orderBy: [{ createdAt: 'desc' }],
				skip: offset,
				take: limit
			}),
			this.prisma.note.count({ where })
		])

		const hasMore = offset + limit < total

		return {
			data,
			pagination: {
				total,
				page,
				limit,
				hasMore
			}
		}
	}

	async getById(noteId: string, userId: string) {
		return this.prisma.note.findFirst({
			where: {
				userId,
				id: noteId
			}
		})
	}

	async create(dto: NoteDto, userId: string) {
		return this.prisma.note.create({
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

	async update(dto: Partial<NoteDto>, noteId: string, userId: string) {
		return this.prisma.note.update({
			where: {
				userId,
				id: noteId
			},
			data: dto
		})
	}

	async delete(noteId: string) {
		return this.prisma.note.delete({
			where: {
				id: noteId
			}
		})
	}
}
