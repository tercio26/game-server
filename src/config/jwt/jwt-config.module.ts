import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY,
            signOptions: {
                expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME}s`,
            },
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfigModule {}
