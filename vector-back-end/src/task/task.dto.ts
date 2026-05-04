import { Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'
import { Priority } from 'generated/prisma'

export class TaskDto {
	@IsString()
	@IsOptional()
	text: string = ''

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean

	@IsString()
	@IsOptional()
	createdAt?: string

	// @Transform(({ value }) => ('' + value).toLowerCase())
	@IsEnum(Priority)
	@IsOptional()
	priority?: Priority
}
