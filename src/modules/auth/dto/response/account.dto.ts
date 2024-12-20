import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { Optional } from '@nestjs/common'
import { AccountProvider, AccountStatus } from '../../../../libraries/enum/account.enum'

@Exclude()
export class AccountDto {
    @Expose()
    @ApiProperty()
    accountId: number

    @Expose()
    @Optional()
    @ApiProperty()
    username: string

    @Expose()
    @Optional()
    @ApiProperty()
    email: string

    @Expose()
    @ApiProperty()
    status: AccountStatus

    @Expose()
    @Optional()
    @ApiProperty()
    avatarPath: string

    @Expose()
    @Optional()
    @ApiProperty()
	provider: AccountProvider

    @Expose()
    @Optional()
    @ApiProperty()
	providerId: string // ThirdParty ID
}
