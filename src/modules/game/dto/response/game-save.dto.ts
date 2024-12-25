import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'

@Exclude()
export class GameSaveDTO {
    @Expose()
    @ApiProperty()
    gameSaveId: number

    @Expose()
    @ApiProperty()
    data: object

    @Expose()
    @ApiProperty()
    updatedAt: Date
}
