import { IsNumber, IsOptional, IsString, Min } from "class-validator"

export class QueryDto {
    @IsNumber()
    @IsOptional()
    @Min(1)
    page?: number

    @IsNumber()
    @IsOptional()
    @Min(1)
    limit?: number

    @IsString()
    @IsOptional()
    search?: string
}
