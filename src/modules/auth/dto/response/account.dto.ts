import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { AccountProvider, AccountStatus } from '../../../../libraries/enum/account.enum'
import { IsOptional } from 'class-validator'

@Exclude()
export class AccountDTO {
    @Expose()
    @ApiProperty()
    accountId: number

    @Expose()
    @ApiProperty()
    @IsOptional()
    username: string

    @Expose()
    @ApiProperty()
    @IsOptional()
    email: string

    @Expose()
    @ApiProperty()
    status: AccountStatus

    @Expose()
    @ApiProperty()
    @IsOptional()
    avatarPath: string

    @Expose()
    @ApiProperty()
    @IsOptional()
    provider: AccountProvider

    @Expose()
    @ApiProperty()
    @IsOptional()
    providerId: string // ThirdParty ID
}
