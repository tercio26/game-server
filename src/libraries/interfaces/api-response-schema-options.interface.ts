import {Type} from '@nestjs/common'

export interface ApiResponseSchemaOptions {
    type: Type<unknown>
    isArray?: boolean
}
