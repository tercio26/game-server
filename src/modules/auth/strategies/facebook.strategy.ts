import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { config } from 'dotenv'
import { Profile, Strategy } from 'passport-facebook'
import { AccountProvider } from '../../../libraries/enum/account.enum'
import { LoginRequest } from '../dto/request/login.dto'
import { Guard } from '../../../libraries/enum/enums'

config()

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, Guard.FACEBOOK) {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            scope: ['email', 'profile'],
            profileFields: ["emails", "name"],
            passReqToCallback: true,
        })
    }

    async validate(
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<void> {
        const { id, displayName, emails, photos } = profile
        const user = {
            email: emails[0].value,
            provider: AccountProvider.FACEBOOK,
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
