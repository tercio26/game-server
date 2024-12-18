import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { User } from '../entities/user.entity';
import { RegisterRequest } from '../dto/request/register.dto';

export interface IAuthService {
    register(request: RegisterRequest): Promise<User>

    loginGoogle(request: LoginRequest): Promise<LoginDto>

    loginLocal(credential: LoginRequest): Promise<LoginDto>
}
