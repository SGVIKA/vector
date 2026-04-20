import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { PrismaService } from '../prisma.service';
import { NoteService } from './note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService],
  exports: [NoteService]
})
export class NoteModule {}
