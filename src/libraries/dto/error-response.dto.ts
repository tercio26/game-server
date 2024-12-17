import {ApiProperty} from '@nestjs/swagger'
import {ErrorDetail} from './error-detail.dto'

export class ErrorResponse<T> {
    @ApiProperty({description: 'The status of the response', enum: ['error']})
    status: string
    @ApiProperty({description: 'The error details', type: ErrorDetail})
    error: ErrorDetail
    @ApiProperty({description: 'The data payload'})
    data?: T

    /**
     * Constructor
     *
     * @param code
     * @param message
     * @param data
     */
    constructor(code: string, message: string, data?: T) {
        this.status = 'error'
        this.error = {
            code: code,
            message: message,
        }
        this.data = data
    }
}
