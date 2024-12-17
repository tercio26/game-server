import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { Optional } from '@nestjs/common'
import { UserProvider, UserStatus } from '../../../../libraries/enum/user.enum'

@Exclude()
export class UserDto {
    @Expose()
    @ApiProperty()
    userId: number

    @Expose()
    @Optional()
    @ApiProperty()
    name: string

    @Expose()
    @Optional()
    @ApiProperty()
    email: string

    @Expose()
    @ApiProperty()
    status: UserStatus

    @Expose()
    @Optional()
    @ApiProperty()
    avatarPath: string

    @Expose()
    @Optional()
    @ApiProperty()
	provider: UserProvider

    @Expose()
    @Optional()
    @ApiProperty()
	providerId: string // ThirdParty ID

    @Expose()
    @ApiProperty()
	token: string

    @Expose()
    @ApiProperty()
	rememberToken: string

    @Expose()
    @ApiProperty()
	tokenExpiredAt: Date
}
