import {ApiProperty} from '@nestjs/swagger'
import {Pagination} from './pagination.dto'

export class SuccessResponse<T> {
    @ApiProperty({description: 'The status of the response'})
    status?: string

    @ApiProperty({description: 'The data payload'})
    data: T

    @ApiProperty({description: 'Header'})
    headers?: string[]

    @ApiProperty({description: 'Width of column header'})
    width?: object

    @ApiProperty({description: 'Additional metadata', required: false})
    meta?: {
        pagination?: Pagination
    }

    constructor(data?: T, meta?: { pagination?: Pagination }) {
        this.status = 'success'
        this.data = data
        this.meta = meta
    }
}
