import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { IAuthService } from '../interface/auth-service.interface';

import { LoginRequest } from '../dto/request/login.dto';
import { LoginDto } from '../dto/response/login.dto';
import { I18nTranslateService } from '../../../libraries/services/i18n-translate.service';
import { BcryptService } from '../../../libraries/services/bcrypt.service';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dto/response/user.dto';
import { UserProvider } from '../../../libraries/enum/user.enum';
import { User } from '../entities/user.entity';
import { RegisterRequest } from '../dto/request/register.dto';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		@InjectRepository(UserRepository) private userRepository: UserRepository,
		private readonly bcryptService: BcryptService,
		private readonly translateService: I18nTranslateService,
		private readonly jwtService: JwtService,
	) {
	}

	async register(request: RegisterRequest): Promise<User> {
		const hashedPassword = await this.bcryptService.hash(request.password);

		const user = this.userRepository.create({
			email: request.email,
			name: await this._generateUserName(),
			password: hashedPassword,
			provider: UserProvider.LOCAL,
		});

		return this.userRepository.save(user);
	}

	async login(credential: LoginRequest): Promise<LoginDto> {
		const user = await this._validateLogin(credential);


		const userInfo = plainToInstance(UserDto, user);
		const accessToken = this.jwtService.sign({
			sub: user.userId,
			...userInfo,
		});

		return plainToInstance(LoginDto, { accessToken, userInfo });
	}

	googleLogin(req) {
		if (!req.user) {
			throw new UnauthorizedException('No user from google');
		}

		const userInfo = plainToInstance(UserDto, req.user);
		const accessToken = this.jwtService.sign({
			sub: req.user.id,
			...userInfo,
		});

		return plainToInstance(LoginDto, { accessToken, userInfo });
	}


	async _validateLogin(credential: LoginRequest): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { email: credential.email },
		});

		if (user && (await this.bcryptService.compare(credential.password, user.password))) {
			return user;
		}

		const errorMessage = await this.translateService.translate('message.login.invalid_email');
		throw new UnauthorizedException(errorMessage);
	}

	async _generateUserName(): Promise<string> {
		const lastUser = await this.userRepository.findOne({
			order: { userId: 'DESC' },
		});

		let userId = 1;
		if (lastUser) {
			userId = lastUser.userId + 1;
		}

		const formattedUserId = userId.toString().padStart(8, '0');
		return `user${formattedUserId}`;
	}
}
