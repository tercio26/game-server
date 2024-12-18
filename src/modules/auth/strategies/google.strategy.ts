import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { UserProvider } from '../../../libraries/enum/user.enum'
import { config } from 'dotenv'
import { UserDto } from '../dto/response/user.dto';
import { LoginRequest } from '../dto/request/login.dto';

config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
            passReqToCallback: true,
        })
    }

    async validate(
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<void> {
        const { id, displayName, emails, photos } = profile
        const user = {
            email: emails[0].value,
            provider: UserProvider.GOOGLE,
            providerId: id,
            name: displayName,
            avatarPath: photos[0].value,
            // req: req,
            // accessToken: accessToken,
            // refreshToken: refreshToken,
        } as LoginRequest
        done(null, user)
    }
}
