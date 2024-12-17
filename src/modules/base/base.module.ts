import { Module } from '@nestjs/common'

import { BaseController } from './controllers/base.controller'

@Module({
    imports: [],
    controllers: [BaseController],
    providers: [],
})
export class BaseModule {}
