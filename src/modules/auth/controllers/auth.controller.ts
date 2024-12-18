import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { PublicApi } from '../../../libraries/decorators/open-api/public.decorator'
import { AuthFacade } from '../facades/auth.facade'
import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { UserDto } from '../dto/response/user.dto'
import { GoogleOAuthGuard } from '../guard/google-oauth.guard'

@Controller('auth')
export class AuthController {
    constructor(private authFacade: AuthFacade) {
    }

    @PublicApi()
    @Post('register')
    async register(@Body() request: RegisterRequest): Promise<UserDto> {
        return await this.authFacade.register(request)
    }

    @PublicApi()
    @Post('login')
    async login(@Body() request: LoginRequest): Promise<LoginDto> {
        return await this.authFacade.login(request)
    }

    @PublicApi()
    @Get('google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(): Promise<void> {
        // Redirect to google by GoogleOAuthGuard
    }

    @PublicApi()
    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    googleLoginCallback(@Request() request: any) {
        return this.authFacade.login(request.user)
    }
}
