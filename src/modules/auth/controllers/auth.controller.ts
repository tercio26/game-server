import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ApiTag } from '../../../libraries/enum/api.enum'

import { ResponseFactory } from '../../../libraries/factories/response.factory'
import { IAuthFacade, IAuthFacadeToken } from '../interfaces/auth-facade.interface'

import { LoginRequest } from '../dto/request/login.dto'
import { LoginDTO } from '../dto/response/login.dto'
import { RegisterLocalRequest } from '../dto/request/register-local.dto'
import { AccountDTO } from '../dto/response/account.dto'

@Controller('auth')
export class AuthController {
    constructor(@Inject(IAuthFacadeToken) private readonly authFacade: IAuthFacade) {}

    @Post('login')
    @ApiOperation({ summary: 'Login with local account or account from provider Google/Facebook/Apple' })
    @ApiBody({
        type: LoginRequest,
        required: true,
        description: 'Login with local account or account from provider Google/Facebook/Apple',
    })
    @ApiResponse({ type: LoginDTO })
    @ApiTags(ApiTag.AUTHENTICATION)
    async login(@Body() request: LoginRequest) {
        return ResponseFactory.success(await this.authFacade.login(request))
    }

    @Post('register')
    @ApiOperation({ summary: 'Registers a new account using local authentication' })
    @ApiBody({
        type: RegisterLocalRequest,
        required: true,
        description: 'The request containing the necessary data for registration',
    })
    @ApiResponse({ type: AccountDTO })
    @ApiTags(ApiTag.AUTHENTICATION)
    async register(@Body() request: RegisterLocalRequest) {
        return ResponseFactory.success(await this.authFacade.register(request))
    }
}
