import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { AccountEntity } from '../entities/account.entity'
import { RegisterRequest } from '../dto/request/register.dto'

export const IAuthServiceToken: string = 'IAuthService'

export interface IAuthService {
    validateRegisterLocal(request: RegisterRequest): Promise<void>

    registerLocal(request: RegisterRequest): Promise<AccountEntity>

    loginGoogle(request: LoginRequest): Promise<LoginDto>

    loginFacebook(request: LoginRequest): Promise<LoginDto>

    loginApple(request: LoginRequest): Promise<LoginDto>

    loginLocal(credential: LoginRequest): Promise<LoginDto>
}
