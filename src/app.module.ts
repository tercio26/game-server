import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { I18nConfigModule } from './config/i18n/i18n-config.module';
import { BaseModule } from './modules/base/base.module';
import { AuthGuard } from './modules/auth/guard/jwt-auth.guard';

@Module({
	imports: [
		// Load configuration
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		DatabaseModule,
		I18nConfigModule,
		BaseModule,
		// Modules
		AuthModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {
}
