import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { config } from 'dotenv'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Guard } from '../../../libraries/enum/enums'

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, Guard.JWT) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(user: any) {
        return user
    }
}
