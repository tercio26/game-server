import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { GoogleStrategy } from './strategies/google.strategy'
import { FacebookStrategy } from './strategies/facebook.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'

import { AuthController } from './controllers/auth.controller'

import { IAuthFacadeToken } from './interfaces/auth-facade.interface'
import { AuthFacade } from './facades/auth.facade'

import { I18nTranslateService } from '../../libraries/services/i18n-translate.service'
import { IAuthServiceToken } from './interfaces/auth-service.interface'
import { AuthService } from './services/auth.service'
import { BcryptService } from '../../libraries/services/bcrypt.service'

import { AccountRepository } from './repositories/account.repository'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME}s`,
            },
        }),
    ],
    providers: [
        I18nTranslateService,
        BcryptService,

        GoogleStrategy,
        FacebookStrategy,
        LocalStrategy,
        JwtStrategy,

        { provide: IAuthFacadeToken, useClass: AuthFacade },

        { provide: IAuthServiceToken, useClass: AuthService },

        AccountRepository,
    ],
    controllers: [AuthController],
})
export class AuthModule {
}
