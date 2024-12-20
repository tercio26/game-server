import { ErrorResponse } from '../dto/error-response.dto'
import { Pagination } from '../dto/pagination.dto'
import { SuccessResponse } from '../dto/success-response.dto'

export class ResponseFactory {
    /**
     * Create the success response with data
     *
     * @param data
     * @returns
     */
    static success<T>(data: T): SuccessResponse<T> {
        return new SuccessResponse<T>(data)
    }

    /**
     * Create the success response with data
     *
     * @returns
     */
    static successNoData<T>(): SuccessResponse<T> {
        return new SuccessResponse<T>()
    }

    /**
     * Create the success response with data and meta
     *
     * @param data
     * @param meta
     * @returns
     */
    static successWithMeta<T>(data: T, meta?: SuccessResponse<T>['meta']): SuccessResponse<T> {
        return new SuccessResponse<T>(data, meta)
    }

    /**
     * Create the success response with pagination
     *
     * @param data
     * @param pagination
     * @returns
     */
    static successWithPagination<T>(data: T[], pagination: Pagination): SuccessResponse<T[]> {
        return new SuccessResponse<T[]>(data, { pagination })
    }

    /**
     * Create the success response with pagination
     *
     * @param data
     * @param headers
     * @param pagination
     * @param width
     * @returns
     */
    static successWithHeader<T>(
        data: T[],
        headers: string[],
        pagination: Pagination,
        width?: object,
    ): SuccessResponse<T[]> {
        return {
            headers: headers,
            data: data,
            meta: { pagination },
            width: width,
        }
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
    static error<T>(code: string, message: string, errors: Record<string, string[]>, data?: T): ErrorResponse<T> {
        return new ErrorResponse<T>(code, message, errors, data)
    }
}
