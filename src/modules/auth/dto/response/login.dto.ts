import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { AccountDTO } from './account.dto'

@Exclude()
export class LoginDTO {
	@Expose()
	@ApiProperty()
	accessToken: string

	@Expose()
	@ApiProperty()
	accountInfo: AccountDTO
}
