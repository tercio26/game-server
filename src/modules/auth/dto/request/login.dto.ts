import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsBoolean, ValidateIf, Length } from 'class-validator'
import { Optional } from '@nestjs/common';
import { AccountProvider } from '../../../../libraries/enum/account.enum';

export class LoginRequest {
	provider: AccountProvider

	@ValidateIf(o => [AccountProvider.LOCAL].includes(o.provider))
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ValidateIf(o => o.provider === AccountProvider.LOCAL)
	@IsNotEmpty()
	@MinLength(8)
	@MaxLength(20)
	@IsString()
	password: string

	@ValidateIf(o => [AccountProvider.GOOGLE].includes(o.provider))
	@IsNotEmpty()
	@Length(21)
	@IsString()
	providerId: string

	@ValidateIf(o => [AccountProvider.GOOGLE].includes(o.provider))
	@IsNotEmpty()
	@IsString()
	name: string

	@ValidateIf(o => [AccountProvider.GOOGLE].includes(o.provider))
	@Optional()
	@IsString()
	avatarPath: string


}
