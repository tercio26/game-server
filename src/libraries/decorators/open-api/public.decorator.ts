import {SetMetadata, CustomDecorator} from '@nestjs/common'

export const PUBLIC_KEY = 'publicAPI'
export const PublicApi = (): CustomDecorator => SetMetadata(PUBLIC_KEY, true)
