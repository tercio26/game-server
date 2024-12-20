import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { PublicApi } from '../../../libraries/decorators/open-api/public.decorator'

import { GoogleOAuthGuard } from '../guards/google-oauth.guard'
import { FacebookGuard } from '../guards/facebook.guard'
import { LocalGuard } from '../guards/local.guard'

import { ResponseFactory } from '../../../libraries/factories/response.factory'
import { IAuthFacade, IAuthFacadeToken } from '../interfaces/auth-facade.interface'

import { LoginRequest } from '../dto/request/login.dto'
import { LoginDto } from '../dto/response/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { AccountDto } from '../dto/response/account.dto'

@Controller('auth')
export class AuthController {
    constructor(@Inject(IAuthFacadeToken) private readonly authFacade: IAuthFacade) {
    }

    // Local Account
    @PublicApi()
    @Post('register')
    async register(@Body() request: RegisterRequest) {
        const response = await this.authFacade.register(request)

        return ResponseFactory.success(plainToInstance(AccountDto, response))
    }

    @PublicApi()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Body() request: LoginRequest) {
        const response = await this.authFacade.login(request)

        return ResponseFactory.success(plainToInstance(LoginDto, response))
    }

    // Google Account
    @PublicApi()
    @Get('google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(): Promise<void> {
        // Redirect to google by GoogleOAuthGuard
    }

    @PublicApi()
    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleLoginCallback(@Request() request: any) {
        const response = await this.authFacade.login(request.user)

        return ResponseFactory.success(plainToInstance(LoginDto, response))
    }

    // Facebook Account
    @PublicApi()
    @Get('facebook')
    @UseGuards(FacebookGuard)
    async facebookAuth(): Promise<void> {
        // Redirect to google by GoogleOAuthGuard
    }

    @PublicApi()
    @Get('facebook/callback')
    @UseGuards(FacebookGuard)
    async facebookLoginCallback(@Request() request: any) {
        const response = await this.authFacade.login(request.user)

        return ResponseFactory.success(plainToInstance(LoginDto, response))
    }
}
