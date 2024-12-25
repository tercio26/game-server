import { ErrorResponse } from '../dto/error-response.dto'
import { Pagination } from '../dto/pagination.dto'
import { SuccessResponse } from '../dto/success-response.dto'

export class ResponseFactory {
    /**
     * Create the success response with data
     *
     * @param data
     * @param message
     * @returns
     */
    static success<T>(data: T, message: string = null): SuccessResponse<T> {
        return new SuccessResponse<T>(data, message)
    }
    /**
     * Create the success response with no data
     *
     */
    static successNoData<T>(message: string = null): SuccessResponse<T> {
        return new SuccessResponse<T>(null, message)
    }

    /**
     * Create the success response with data and meta
     *
     * @param data
     * @param meta
     * @param message
     * @returns
     */
    static successWithMeta<T>(data: T, meta?: SuccessResponse<T>['meta'], message: string = null): SuccessResponse<T> {
        return new SuccessResponse<T>(data, message, meta)
    }

    /**
     * Create the success response with pagination
     *
     * @param data
     * @param pagination
     * @param message
     * @returns
     */
    static successWithPagination<T>(data: T[], pagination: Pagination, message: string = null): SuccessResponse<T[]> {
        return new SuccessResponse<T[]>(data, message, { pagination })
    }

    /**
     * Create the error response with message and detailed errors
     *
     * @param code
     * @param message
     * @param errors
     * @param data
     * @returns
     */
    static error<T>(code: string, message: string, errors: Record<string, string[]> = {}, data: T = null): ErrorResponse<T> {
        return new ErrorResponse<T>(code, message, errors, data)
    }
}
