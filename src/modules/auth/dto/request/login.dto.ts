import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsBoolean, ValidateIf, Length } from 'class-validator'
import { Optional } from '@nestjs/common';
import { UserProvider } from '../../../../libraries/enum/user.enum';

export class LoginRequest {
	provider: UserProvider

	@ValidateIf(o => [UserProvider.LOCAL].includes(o.provider))
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ValidateIf(o => o.provider === UserProvider.LOCAL)
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(20)
	@IsString()
	password: string

	@ValidateIf(o => [UserProvider.GOOGLE].includes(o.provider))
	@IsNotEmpty()
	@Length(21)
	@IsString()
	providerId: string

	@ValidateIf(o => [UserProvider.GOOGLE].includes(o.provider))
	@IsNotEmpty()
	@IsString()
	name: string

	@ValidateIf(o => [UserProvider.GOOGLE].includes(o.provider))
	@Optional()
	@IsString()
	avatarPath: string


}
