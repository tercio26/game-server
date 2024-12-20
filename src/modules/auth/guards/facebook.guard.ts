import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Guard } from '../../../libraries/enum/enums'

@Injectable()
export class FacebookGuard extends AuthGuard(Guard.FACEBOOK) {
    constructor(private configService: ConfigService) {
        super({
            accessType: 'offline',
        })
    }

    handleRequest(err, user, info, context) {
        if (err || !user) {
            throw new UnauthorizedException('Facebook Login error')
        }
        return user
    }
}