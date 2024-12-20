import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20'
import { AccountProvider } from '../../../libraries/enum/account.enum'
import { LoginRequest } from '../dto/request/login.dto'
import { Guard } from '../../../libraries/enum/enums'

config()

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, Guard.GOOGLE) {
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
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        const { id, displayName, emails, photos } = profile
        const user = {
            email: emails[0].value,
            provider: AccountProvider.GOOGLE,
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
