import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common'
import { Response } from 'express'
import { ResponseFactory } from '../factories/response.factory'
import { ErrorCodeEnum } from '../enum/error-codes.enum'

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()

        // Create the error response
        const errorResponse = ResponseFactory.error(
            ErrorCodeEnum.REQUEST_VALIDATION_ERROR,
            this.extractErrorMessage(exceptionResponse),
        )
        response.status(status).json(errorResponse)
    }

    /**
     * Extract the error message from the exception response
     *
     * @param exceptionResponse
     * @returns
     */
    extractErrorMessage(exceptionResponse: any): string {
        let messages: string[] = []

        // If the exception response is not an object or does not have a message key
        if (typeof exceptionResponse != 'object' || !exceptionResponse['message']) {
            return ''
        }

        if (typeof exceptionResponse['message'] == 'string') {
            return exceptionResponse['message']
        }

        const extractMessagesFromErrors = (errors: any[]): string[] => {
            return errors.flatMap((error) => {
                if (typeof error === 'string') {
                    return error
                } else if (typeof error === 'object') {
                    if (error.constraints) {
                        // Extract the error messages from the constraints.
                        return Object.values(error.constraints)
                    } else {
                        return extractMessagesFromErrors(error.children)
                    }
                }
                return []
            })
        }
        messages = extractMessagesFromErrors(exceptionResponse['message'])
        return messages.join(', ')
    }
}
