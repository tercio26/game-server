import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Exclude()
export class GameDTO {
    @Expose()
    @ApiProperty()
    gameId: number

    @Expose()
    @ApiProperty()
    name: string

    @Expose()
    @ApiProperty()
    gameCode: string

    @Expose()
    @ApiProperty()
    gameImage: string

    @Expose()
    @ApiProperty()
    description: string

    @Expose()
    @ApiProperty()
    gameStatus: number

    @Expose()
    @ApiProperty()
    maxNumberPlayers: number

    @Expose()
    @ApiProperty()
    maxNumberGameSaves: number

    @Expose()
    @ApiProperty()
    resetTime: string
}
