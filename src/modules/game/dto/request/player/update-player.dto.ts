import { IsInt, IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdatePlayerRequest {
    @ApiProperty()
    @Length(4, 50)
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsInt()
    @IsOptional()
    gems: number

    @ApiProperty()
    @IsInt()
    @IsOptional()
    gold: number

    @ApiProperty()
    @IsInt()
    @IsOptional()
    energy: number

    @ValidateIf(o => [o.name, o.gems, o.gold, o.energy].every(x => x === undefined))
    @IsNotEmpty()
    Request: boolean
}
