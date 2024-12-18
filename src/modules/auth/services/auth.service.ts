import { Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { IAuthService } from '../interface/auth-service.interface'
import { UserProvider } from '../../../libraries/enum/user.enum'

import { I18nTranslateService } from '../../../libraries/services/i18n-translate.service'
import { BcryptService } from '../../../libraries/services/bcrypt.service'

import { UserRepository } from '../repositories/user.repository'

import { User } from '../entities/user.entity'
import { LoginRequest } from '../dto/request/login.dto'
import { RegisterRequest } from '../dto/request/register.dto'
import { LoginDto } from '../dto/response/login.dto'
import { UserDto } from '../dto/response/user.dto'

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
		const hashedPassword = await this.bcryptService.hash(request.password)

		return this.userRepository.registerLocalUser(request.email, hashedPassword, await this._generateUserName())
	}

	async loginLocal(credential: LoginRequest): Promise<LoginDto> {
		const user = await this.userRepository.findOneBy({ email: credential.email })

		if (user && (await this.bcryptService.compare(credential.password, user.password))) {
			return this._loginSuccess(user)
		}

		const errorMessage = await this.translateService.translate('message.login.invalid_email')
		throw new UnauthorizedException(errorMessage)
	}

	async loginGoogle(request: LoginRequest) {
		console.log(request)
		if (!request) {
			throw new UnauthorizedException('No user from google')
		}

		let user = await this.userRepository.getUserByProvider(UserProvider.GOOGLE, request.providerId)
		if (!user) {
            user = await this.userRepository.registerUserByProvider(request)
        }

		return this._loginSuccess(user)
	}

	_loginSuccess(user: User): LoginDto {
		const userInfo = plainToInstance(UserDto, user)
		const accessToken = this.jwtService.sign({
			sub: user.userId,
			...userInfo,
		})

		return plainToInstance(LoginDto, { accessToken, userInfo })
	}

	async _generateUserName(): Promise<string> {
		const lastUser = await this.userRepository.findOne({
			order: { userId: 'DESC' },
		})

		let userId = 1
		if (lastUser) {
			userId = lastUser.userId + 1
		}

		const formattedUserId = userId.toString().padStart(8, '0')
		return `user${formattedUserId}`
	}
}
