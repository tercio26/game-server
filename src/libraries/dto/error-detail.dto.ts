import {ApiProperty} from '@nestjs/swagger'

export class ErrorDetail {
    @ApiProperty({description: 'The error code'})
    code: string

    @ApiProperty({description: 'The error message'})
    message: string
}
