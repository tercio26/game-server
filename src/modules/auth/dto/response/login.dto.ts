import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { AccountDto } from './account.dto'

@Exclude()
export class LoginDto {
	@Expose()
	@ApiProperty()
	accessToken: string

	@Expose()
	@ApiProperty()
	accountInfo: AccountDto
}
