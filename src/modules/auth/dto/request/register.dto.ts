import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsBoolean } from 'class-validator'
import { ExtLength } from '../../../../libraries/decorators/validation/length-validation.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterRequest {
    @ApiProperty()
    @ExtLength(1, 50)
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @IsString()
    password: string
}
