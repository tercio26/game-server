import {ApiProperty} from '@nestjs/swagger'
import {Pagination} from './pagination.dto'

export class SuccessResponse<T> {
    @ApiProperty({description: 'The status of the response'})
    status?: string

    @ApiProperty({description: 'The data payload'})
    data: T

    @ApiProperty({ description: 'The response message', required: false })
    message: string

    @ApiProperty({description: 'Header'})
    headers?: string[]

    @ApiProperty({description: 'Width of column header'})
    width?: object

    @ApiProperty({description: 'Additional metadata', required: false})
    meta?: {
        pagination?: Pagination
    }

    constructor(data?: T, message: string = null, meta?: { pagination?: Pagination }) {
        this.status = 'success'
        this.data = data
        this.message = message
        this.meta = meta
    }
}
