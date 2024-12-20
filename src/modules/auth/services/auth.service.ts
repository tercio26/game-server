import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { IAuthService } from '../interfaces/auth-service.interface'
import { AccountProvider } from '../../../libraries/enum/account.enum'

import { I18nTranslateService } from '../../../libraries/services/i18n-translate.service'
import { BcryptService } from '../../../libraries/services/bcrypt.service'

import { AccountRepository } from '../repositories/account.repository'

import { AccountEntity } from '../entities/account.entity'
import { LoginRequest } from '../dto/request/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { LoginDto } from '../dto/response/login.dto'
import { AccountDto } from '../dto/response/account.dto'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(AccountRepository) private accountRepository: AccountRepository,
        private readonly bcryptService: BcryptService,
        private readonly translateService: I18nTranslateService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateRegisterLocal(request: RegisterRequest): Promise<void> {
        const account = await this.accountRepository.findOneBy({
            email: request.email,
        })

        if (account) {
            const errorMessage = await this.translateService.translate('message.register.email_exist')
            throw new UnauthorizedException(errorMessage)
        }
    }

    async registerLocal(request: RegisterRequest): Promise<AccountEntity> {
        const hashedPassword = await this.bcryptService.hash(request.password)

        return this.accountRepository.registerLocalAccount(request.email, hashedPassword)
    }

    async loginLocal(credential: LoginRequest): Promise<LoginDto> {
        const account = await this.accountRepository.findOneBy({ email: credential.email })

        if (account && this.bcryptService.compare(credential.password, account.password)) {
            return this._loginSuccess(account)
        }

        const errorMessage = await this.translateService.translate('message.login.invalid_email')
        throw new UnauthorizedException(errorMessage)
    }

    async loginGoogle(request: LoginRequest) {
        if (!request) {
            throw new UnauthorizedException('No account from Google')
        }

        let account = await this.accountRepository.getAccountByProvider(AccountProvider.GOOGLE, request.providerId)
        if (!account) {
            account = await this.accountRepository.registerByProvider(request)
        }

        return this._loginSuccess(account)
    }

    async loginFacebook(request: LoginRequest): Promise<LoginDto> {
        if (!request) {
            throw new UnauthorizedException('No account from Facebook')
        }

        let account = await this.accountRepository.getAccountByProvider(AccountProvider.FACEBOOK, request.providerId)
        if (!account) {
            account = await this.accountRepository.registerByProvider(request)
        }

        return this._loginSuccess(account)
    }

    async loginApple(request: LoginRequest): Promise<LoginDto> {
        return
    }

    _loginSuccess(account: AccountEntity): LoginDto {
        const accountInfo = plainToInstance(AccountDto, account)
        const accessToken = this.jwtService.sign({
            sub: account.accountId,
            ...accountInfo,
        })

        return plainToInstance(LoginDto, { accessToken, accountInfo })
    }
}
