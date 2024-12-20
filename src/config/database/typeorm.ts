import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config()

const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'], // Load all entities from the entities folder
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    charset: 'utf8mb4',
    logging: ['all', 'query'],
    logger: 'file',
}
export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
