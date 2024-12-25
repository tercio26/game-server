import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { AccountProvider } from '../../../libraries/enum/account.enum'

import { IAuthFacade } from '../interfaces/auth-facade.interface'
import { IAuthService, IAuthServiceToken } from '../interfaces/auth-service.interface'

import { LoginRequest } from '../dto/request/login.dto'
import { RegisterLocalRequest } from '../dto/request/register-local.dto'
import { AccountDTO } from '../dto/response/account.dto'
import { LoginDTO } from '../dto/response/login.dto'

@Injectable()
export class AuthFacade implements IAuthFacade {
    constructor(@Inject(IAuthServiceToken) private readonly authService: IAuthService) {}

    login(request: LoginRequest): Promise<LoginDTO> {
        switch (request.provider) {
            case AccountProvider.APPlE:
                return this.authService.loginByApple(request)

            case AccountProvider.FACEBOOK:
                return this.authService.loginByFacebook(request)

            case AccountProvider.GOOGLE:
                return this.authService.loginByGoogle(request)

            case AccountProvider.LOCAL:
                return this.authService.loginByLocalAccount(request)
            default:
                throw new BadRequestException('Invalid provider')
        }
    }

    register(request: RegisterLocalRequest): Promise<AccountDTO> {
        return this.authService.registerLocalAccount(request)
    }
}
