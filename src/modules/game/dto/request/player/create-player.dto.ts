import { IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePlayerRequest {
    @ApiProperty()
    @Length(4, 50)
    @IsString()
    @IsNotEmpty()
    name: string
}
