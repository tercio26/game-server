// src/database/database.module.ts
import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import typeorm from './typeorm'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.get('typeorm'),
        }),
    ],
    exports: [TypeOrmModule], // Export TypeOrmModule to make it available to other modules
})
export class DatabaseModule {}
