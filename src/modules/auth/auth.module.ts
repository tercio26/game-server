import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthFacade } from './facades/auth.facade';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtConfigModule } from '../../config/jwt/jwt-config.module';
import { UserRepository } from './repositories/user.repository';
import { BcryptService } from '../../libraries/services/bcrypt.service';
import { I18nTranslateService } from '../../libraries/services/i18n-translate.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { RoleGuard } from './guard/role.guard';

@Module({
  imports: [
    JwtConfigModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: RoleGuard },

    I18nTranslateService,
    BcryptService,
    AuthService,
    AuthFacade,
    UserRepository,

    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
