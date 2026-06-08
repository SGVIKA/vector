import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.enableCors({
		// Настройка CORS
		origin: ['http://localhost:3000'], // Разрешён только фронтенд
		credentials: true, // Разрешаем передачу cookie
		exposedHeaders: 'set-cookie' // Доступ к заголовку set-cookie
	})

	await app.listen(4000, '0.0.0.0')
}
bootstrap()
