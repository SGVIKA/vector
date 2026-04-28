import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { NoteModule } from './note/note.module'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		NoteModule,
		TaskModule,
		TimeBlockModule,
	]
})
export class AppModule {}
