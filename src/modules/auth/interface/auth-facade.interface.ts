import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { UserDto } from '../dto/response/user.dto'

export interface IAuthFacade {
    register(request: RegisterRequest): Promise<UserDto>

    login(credential: LoginRequest): Promise<LoginDto>
}
