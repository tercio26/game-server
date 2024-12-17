import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { PublicApi } from '../../../libraries/decorators/open-api/public.decorator'
import { ResponseFactory } from '../../../libraries/factories/response.factory'

@Controller('/')
export class BaseController {
    @PublicApi()
    @Get('ping')
    @ApiOperation({ summary: 'API to check server connection' })
    @HttpCode(HttpStatus.OK)
    ping() {
        return ResponseFactory.success('Pong!')
    }
}
