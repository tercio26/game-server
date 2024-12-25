import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationExceptionFilter } from './libraries/filters/validation-exception.filter'
import { BadRequestException, INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
	// Set the global prefix (API Context)
	const context = configService.get('server.contextPath')
	// Configure the OpenAPI document
	configureOpenAPIDocument(app, context)

	app.useGlobalFilters(new ValidationExceptionFilter())

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors) => new BadRequestException(errors),
		}),
	)

	app.setGlobalPrefix(context)

	// Enable CORS
	app.enableCors({
		// Allow the origins configured in the configuration file
		origin: configService.get('server.cors.allowedOrigins'),
		methods: configService.get('server.cors.allowedMethods'),
		exposedHeaders: configService.get('server.cors.exposedHeaders'),
		credentials: true, // Allow sending cookies or authorization headers
	})

	// Set the server port
	const port = configService.get('server.port')
	await app.listen(port)

	Logger.log(`Port: ${port}, context path is ${context}`, 'ApplicationStarted')
}

function configureOpenAPIDocument(app: INestApplication, context: any) {
	const config = new DocumentBuilder()
		.setTitle('Dreamers game APIs')
		.setDescription('This document provide the APIs specification for Game Dreamers.')
		.setVersion('v1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup(`docs`, app, document)
}

bootstrap()
