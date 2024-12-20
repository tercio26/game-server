import {ApiProperty} from '@nestjs/swagger'
import {ErrorDetail} from './error-detail.dto'

export class ErrorResponse<T> {
    @ApiProperty({ description: 'The status of the response', enum: ['error'] })
    status: string

    @ApiProperty({ description: 'The error code' })
    errorCode: string

    @ApiProperty({ description: 'The error message' })
    message: string

    @ApiProperty({ description: 'The detailed errors', type: Object })
    errors: Record<string, string[]>

    @ApiProperty({ description: 'The data payload' })
    data?: T

    /**
     * Constructor
     *
     * @param code
     * @param message
     * @param errors
     * @param data
     */
    constructor(code: string, message: string, errors: Record<string, string[]>, data?: T) {
        this.status = 'error'
        this.errorCode = code
        this.message = message
        this.errors = errors
        this.data = data
    }
}
