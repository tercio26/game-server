import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PublicApi } from '../../../libraries/decorators/open-api/public.decorator';
import { AuthFacade } from '../facades/auth.facade';
import { LoginRequest } from '../dto/request/login.dto';
import { LoginDto } from '../dto/response/login.dto';
import { RegisterRequest } from '../dto/request/register.dto';
import { UserDto } from '../dto/response/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserProvider } from '../../../libraries/enum/user.enum';

@Controller('auth')
export class AuthController {
	constructor(private authFacade: AuthFacade) {
	}

	@PublicApi()
	@Post('register')
	async register(@Body() request: RegisterRequest): Promise<UserDto> {
		return await this.authFacade.register(request);
	}

	@PublicApi()
	@Post('login')
	async login(@Body() request: LoginRequest): Promise<LoginDto> {
		return await this.authFacade.login(request);
	}

	@PublicApi()
	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth(@Req() req) {
	}

	@PublicApi()
	@Get('google/redirect')
	@UseGuards(AuthGuard('google'))
	googleAuthRedirect(@Req() req) {
		req['provider'] = UserProvider.GOOGLE
		return this.authFacade.login(req);
	}

	@PublicApi()
	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	googleLoginCallback(@Req() req) {
		return this.authFacade.login(req.user);
	}
}
