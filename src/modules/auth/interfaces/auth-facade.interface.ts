import { LoginRequest } from '../dto/request/login.dto'
import { RegisterLocalRequest } from '../dto/request/register-local.dto'
import { AccountDTO } from '../dto/response/account.dto'
import { LoginDTO } from '../dto/response/login.dto';

export const IAuthFacadeToken: string = 'IAuthFacade'

export interface IAuthFacade {
    login(request: LoginRequest): Promise<LoginDTO>

    register(request: RegisterLocalRequest): Promise<AccountDTO>
}
