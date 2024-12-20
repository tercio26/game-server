import { Inject, Injectable } from '@nestjs/common'
import { AccountProvider } from '../../../libraries/enum/account.enum'

import { IAuthFacade } from '../interfaces/auth-facade.interface'
import { IAuthService, IAuthServiceToken } from '../interfaces/auth-service.interface'

import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { AccountDto } from '../dto/response/account.dto'
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthFacade implements IAuthFacade {
    constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {
    }

    async register(request: RegisterRequest): Promise<AccountDto> {
        await this.authService.validateRegisterLocal(request)

        return plainToInstance(AccountDto, this.authService.registerLocal(request))
    }

    login(credential: LoginRequest): Promise<LoginDto> {
        switch (credential.provider) {
            case AccountProvider.GOOGLE:
                return this.authService.loginGoogle(credential)
            case AccountProvider.FACEBOOK:
                return this.authService.loginFacebook(credential)
            case AccountProvider.APPlE:
                return this.authService.loginApple(credential)
            default:
                return this.authService.loginLocal(credential)
        }
    }
}
