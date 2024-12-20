import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { Guard } from '../../../libraries/enum/enums'

@Injectable()
export class JwtGuard extends AuthGuard(Guard.JWT) {
    constructor(private configService: ConfigService) {
        super({
            accessType: 'offline',
        })
    }

    handleRequest(err: any, user: any, _info: any) {
        if (err || !user) {
            throw new UnauthorizedException('Invalid Access token')
        }
        return user
    }
}