import { Module } from '@nestjs/common'


import { I18nTranslateService } from '../../libraries/services/i18n-translate.service'
import { GamePlayerController } from './controllers/game-player.controller'

@Module({
    imports: [

    ],
    providers: [
        I18nTranslateService,

    ],
    controllers: [GamePlayerController],
})
export class GameModule {
}
