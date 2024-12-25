import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { config } from 'dotenv'
import { Strategy } from 'passport-local'
import { InjectRepository } from '@nestjs/typeorm'
import { AccountRepository } from '../repositories/account.repository'
import { BcryptService } from '../../../libraries/services/bcrypt.service'
import { I18nTranslateService } from '../../../libraries/services/i18n-translate.service'
import { AccountEntity } from '../entities/account.entity'
import { Guard } from '../../../libraries/enum/enums'

config()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, Guard.LOCAL) {
    constructor(
        @InjectRepository(AccountRepository) private userRepository: AccountRepository,
        private readonly bcryptService: BcryptService,
        private readonly i18n: I18nTranslateService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        })
    }

    async validate(email: string, password: string): Promise<AccountEntity> {
        const user = await this.userRepository.findOneBy({ email: email })

        if (user && this.bcryptService.compare(password, user.password)) {
            return user
        }

        throw new UnauthorizedException(this.i18n.t('message.login.invalid_email'))
    }
}
