import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsBoolean } from 'class-validator'
import { ExtLength } from '../../../../libraries/decorators/validation/length-validation.decorator'
import { ApiProperty } from '@nestjs/swagger'
import { Optional } from '@nestjs/common';
import { UserProvider } from '../../../../libraries/enum/user.enum';

export class LoginRequest {
	@ApiProperty()
	@ExtLength(1, 50)
	@Optional()
	@IsEmail()
	email: string

	@ApiProperty()
	@Optional()
	@MinLength(8)
	@MaxLength(20)
	@IsString()
	password: string

	@ApiProperty()
	@Optional()
	@IsBoolean()
	isRemember: boolean

	@ApiProperty()
	@Optional()
	provider: UserProvider
}
