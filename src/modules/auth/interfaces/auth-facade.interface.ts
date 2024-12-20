import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { AccountDto } from '../dto/response/account.dto'

export const IAuthFacadeToken: string = 'IAuthFacade'

export interface IAuthFacade {
    register(request: RegisterRequest): Promise<AccountDto>

    login(credential: LoginRequest): Promise<LoginDto>
}
