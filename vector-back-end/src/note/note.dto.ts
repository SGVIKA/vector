import { IsOptional, IsString } from "class-validator";


export class NoteDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	text?: string
}
