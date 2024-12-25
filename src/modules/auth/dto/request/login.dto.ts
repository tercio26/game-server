import { IsNotEmpty, IsEnum, IsEmail, ValidateIf, MinLength, MaxLength, IsString, IsOptional } from 'class-validator'
import { AccountProvider } from '../../../../libraries/enum/account.enum'
import { ApiProperty } from '@nestjs/swagger';

export abstract class LoginRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(AccountProvider)
    provider: AccountProvider

    @ApiProperty()
    @ValidateIf(o => o.provider === AccountProvider.LOCAL)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @ValidateIf(o => o.provider === AccountProvider.LOCAL)
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @IsString()
    password: string

    @ApiProperty()
    @ValidateIf(o => [AccountProvider.GOOGLE, AccountProvider.FACEBOOK, AccountProvider.APPlE].includes(o.provider))
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    accessToken: string
}
