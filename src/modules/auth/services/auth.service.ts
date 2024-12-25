import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library'
import { FB, FacebookApiException } from 'fb'
import appleSignin, { AppleIdTokenType } from 'apple-signin-auth'

import { IAuthService } from '../interfaces/auth-service.interface'
import { AccountProvider } from '../../../libraries/enum/account.enum'

import { I18nTranslateService } from '../../../libraries/services/i18n-translate.service'
import { BcryptService } from '../../../libraries/services/bcrypt.service'

import { AccountRepository } from '../repositories/account.repository'

import { AccountEntity } from '../entities/account.entity'
import { LoginRequest } from '../dto/request/login.dto'
import { RegisterLocalRequest } from '../dto/request/register-local.dto'
import { AccountDTO } from '../dto/response/account.dto'
import { LoginDTO } from '../dto/response/login.dto';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(AccountRepository) private accountRepository: AccountRepository,
        private readonly bcryptService: BcryptService,
        private readonly i18n: I18nTranslateService,
        private readonly jwtService: JwtService,
    ) {}

    async loginByApple(request: LoginRequest): Promise<LoginDTO> {
        try {
            // Authenticate token and get user information from idToken
            const response: AppleIdTokenType = await appleSignin.verifyIdToken(request.accessToken, {
                audience: process.env.APPLE_CLIENT_ID, // Apple Client ID
                ignoreExpiration: false, // Optional
            })

            const provider = AccountProvider.APPlE
            const providerId = response.sub
            const email = response.email

            let account: AccountEntity = await this.accountRepository.getAccountByProvider(provider, providerId)
            if (!account) {
                account = await this.accountRepository.registerByProvider(provider, providerId, email)
            }

            return this._loginSuccess(account)
        } catch (error) {
            throw new UnauthorizedException(this.i18n.t('message.login.apple.invalid_token'))
        }
    }

    async loginByFacebook(request: LoginRequest): Promise<LoginDTO> {
        try {
            // Authenticate and get user information from accessToken
            const response = await FB.api('me', {
                fields: 'id,name,email',
                access_token: request.accessToken,
            })

            const provider = AccountProvider.FACEBOOK
            const providerId = response.id
            const email = response.email

            let account: AccountEntity = await this.accountRepository.getAccountByProvider(provider, providerId)
            if (!account) {
                account = await this.accountRepository.registerByProvider(provider, providerId, email)
            }

            return this._loginSuccess(account)
        } catch (e: FacebookApiException) {
            throw new UnauthorizedException(this.i18n.t('message.login.facebook.invalid_token'))
        }
    }

    async loginByGoogle(request: LoginRequest): Promise<LoginDTO> {
        try {
            const oAuth2Client = new OAuth2Client()

            // Verify the idToken, and access the claims.
            const ticket: LoginTicket = await oAuth2Client.verifyIdToken({
                idToken: request.accessToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            })

            const payload: TokenPayload = ticket.getPayload() // Retrieve user info from token
            const provider = AccountProvider.GOOGLE
            const email: string = payload?.email
            const providerId: string = payload?.sub
            const avatarPath: string = payload?.picture

            let account: AccountEntity = await this.accountRepository.getAccountByProvider(provider, providerId)
            if (!account) {
                account = await this.accountRepository.registerByProvider(provider, providerId, email, avatarPath)
            }

            return this._loginSuccess(account)
        } catch (error) {
            throw new UnauthorizedException(this.i18n.t('message.login.google.invalid_token'))
        }
    }

    async loginByLocalAccount(credential: LoginRequest): Promise<LoginDTO> {
        const account = await this.accountRepository.findOneBy({ email: credential.email })

        if (account && this.bcryptService.compare(credential.password, account.password)) {
            return this._loginSuccess(account)
        }

        throw new UnauthorizedException(this.i18n.t('message.login.local.invalid_credentials'))
    }

    async registerLocalAccount(request: RegisterLocalRequest): Promise<AccountEntity> {
        await this._validateRegisterLocalAccount(request)

        const hashedPassword = this.bcryptService.hash(request.password)

        return this.accountRepository.registerLocalAccount(request.email, hashedPassword)
    }

    _loginSuccess(account: AccountEntity): LoginDTO {
        const accountInfo: AccountDTO = plainToInstance(AccountDTO, account)
        const accessToken: string = this.jwtService.sign({
            sub: account.accountId,
            ...accountInfo,
        })

        return plainToInstance(LoginDTO, { accessToken, accountInfo })
    }

    async _validateRegisterLocalAccount(request: RegisterLocalRequest): Promise<AccountEntity> {
        // Validate Email existing
        const account: AccountEntity = await this.accountRepository.findOneBy({
            email: request.email,
        })

        if (account) {
            throw new UnauthorizedException(this.i18n.t('message.register.email_exist'))
        }
        return account
    }
}
