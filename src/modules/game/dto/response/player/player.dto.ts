import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'

@Exclude()
export class PlayerDTO {
    @Expose()
    @ApiProperty()
    playerId: number

    @Expose()
    @ApiProperty()
    name: string

    @Expose()
    @ApiProperty()
    accountId: number

    @Expose()
    @ApiProperty()
    gameId: number

    @Expose()
    @ApiProperty()
    energy: number

    @Expose()
    @ApiProperty()
    gold: number

    @Expose()
    @ApiProperty()
    gems: number
}
