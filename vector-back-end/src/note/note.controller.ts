import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { NoteService } from './note.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { NoteDto } from './note.dto'
import { QueryDto } from 'src/dto/query.dto'

@Controller('user/notes')
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.noteService.getAll(userId)
	}

	@Get('filter')
	@Auth()
	async getWithFilter(
		@Query() query: QueryDto,
		@CurrentUser('id') userId: string
	) {
		return this.noteService.getWithFilter(query, userId)
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.noteService.getById(id, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: NoteDto, @CurrentUser('id') userId: string) {
		return this.noteService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async update(
		@Body() dto: NoteDto,
		@CurrentUser('id') userId: string,
		@Param('id') id: string
	) {
		return this.noteService.update(dto, id, userId)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.noteService.delete(id)
	}
}
