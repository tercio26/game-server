import { IsNotEmpty, IsObject } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GameSaveRequest {
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    data: object
}
