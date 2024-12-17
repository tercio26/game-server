import { ApiProperty } from '@nestjs/swagger'
import { Expose, Exclude } from 'class-transformer'
import { UserDto } from './user.dto'

@Exclude()
export class LoginDto {
	@Expose()
	@ApiProperty()
	accessToken: string

	@Expose()
	@ApiProperty()
	userInfo: UserDto
}
