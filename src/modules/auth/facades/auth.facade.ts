import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { AuthService } from '../services/auth.service'
import { IAuthFacade } from '../interface/auth-facade.interface'
import { Injectable } from '@nestjs/common'
import { RegisterRequest } from '../dto/request/register.dto'
import { UserDto } from '../dto/response/user.dto'
import { UserProvider } from '../../../libraries/enum/user.enum'

@Injectable()
export class AuthFacade implements IAuthFacade {
    constructor(private authService: AuthService) {
    }

    register(request: RegisterRequest): Promise<UserDto> {
        return this.authService.register(request)
    }

    login(credential: LoginRequest): Promise<LoginDto> {
        switch (credential.provider) {
            case UserProvider.GOOGLE:
                return this.authService.loginGoogle(credential)
            default:
                return this.authService.loginLocal(credential)
        }
    }
}
