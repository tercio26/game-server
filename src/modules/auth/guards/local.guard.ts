import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Guard } from '../../../libraries/enum/enums'

@Injectable()
export class LocalGuard extends AuthGuard(Guard.LOCAL) {
    constructor(private configService: ConfigService) {
        super({
            accessType: 'offline',
        })
    }
}