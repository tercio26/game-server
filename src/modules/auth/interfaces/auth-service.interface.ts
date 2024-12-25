import { LoginRequest } from '../dto/request/login.dto'
import { RegisterLocalRequest } from '../dto/request/register-local.dto'
import { AccountDTO } from '../dto/response/account.dto'
import { LoginDTO } from '../dto/response/login.dto'

export const IAuthServiceToken: string = 'IAuthService'

export interface IAuthService {
    loginByApple(request: LoginRequest): Promise<LoginDTO>

    loginByFacebook(request: LoginRequest): Promise<LoginDTO>

    loginByGoogle(request: LoginRequest): Promise<LoginDTO>

    loginByLocalAccount(request: LoginRequest): Promise<LoginDTO>

    registerLocalAccount(request: RegisterLocalRequest): Promise<AccountDTO>
}
