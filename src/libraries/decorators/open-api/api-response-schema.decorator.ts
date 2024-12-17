import {applyDecorators} from '@nestjs/common'
import {ApiExtraModels, ApiResponse, getSchemaPath} from '@nestjs/swagger'
import {ErrorResponse} from '../../dto/error-response.dto'
import {SuccessResponse} from '../../dto/success-response.dto'
import {ApiResponseSchemaOptions} from '../../interfaces/api-response-schema-options.interface'

export const ApiResponseSchema = (options: ApiResponseSchemaOptions) => {
    const {type, isArray = false} = options

    return applyDecorators(
        ApiExtraModels(SuccessResponse, ErrorResponse, type),
        ApiResponse({
            status: 200,
            description: 'Successful response',
            schema: {
                allOf: [
                    {$ref: getSchemaPath(SuccessResponse)},
                    {
                        properties: {
                            status: {type: 'string', example: 'success'},
                            data: isArray
                                ? {type: 'array', items: {$ref: getSchemaPath(type)}}
                                : {$ref: getSchemaPath(type)},
                            meta: {type: 'object', example: {}},
                        },
                    },
                ],
                example: isArray
                    ? {
                        status: 'success',
                        data: [
                            {
                                id: 0,
                                name: 'string',
                                description: 'string',
                            },
                        ],
                        meta: {},
                    }
                    : {
                        status: 'success',
                        data: {
                            id: 0,
                            name: 'string',
                            description: 'string',
                        },
                        meta: {},
                    },
            },
        }),
        ApiResponse({
            status: 400,
            description: 'Error response',
            schema: {
                allOf: [
                    {$ref: getSchemaPath(ErrorResponse)},
                    {
                        properties: {
                            status: {type: 'string', example: 'error'},
                            error: {
                                type: 'object',
                                properties: {
                                    code: {type: 'string', example: 'string'},
                                    message: {type: 'string', example: 'string'},
                                },
                            },
                        },
                    },
                ],
                example: {
                    status: 'error',
                    error: {
                        code: 'string',
                        message: 'string',
                    },
                },
            },
        }),
    )
}
