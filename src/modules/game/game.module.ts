import { Module } from '@nestjs/common'

import { GamePlayerController } from './controllers/game-player.controller'
import { GameController } from './controllers/game.controller'
import { GameSaveController } from './controllers/game-save.controller'

import { IPlayerFacadeToken } from './interfaces/player.facade.interface'
import { PlayerFacade } from './facades/player.facade'
import { IGameFacadeToken } from './interfaces/game.facade.interface'
import { GameFacade } from './facades/game.facade'
import { IGameSaveFacadeToken } from './interfaces/game-save.facade.interface'
import { GameSaveFacade } from './facades/game-save.facade'

import { IPlayerServiceToken } from './interfaces/player.service.interface'
import { PlayerService } from './services/player.service'
import { IGameServiceToken } from './interfaces/game.service.interface'
import { GameService } from './services/game.service'
import { IGameSaveServiceToken } from './interfaces/game-save.service.interface'
import { GameSaveService } from './services/game-save.service'
import { I18nTranslateService } from '../../libraries/services/i18n-translate.service'

import { PlayerRepository } from './repositories/player.repository'
import { GameRepository } from './repositories/game.repository'
import { GameSaveRepository } from './repositories/game-save.repository'

@Module({
    imports: [],
    providers: [
        I18nTranslateService,

        { provide: IPlayerFacadeToken, useClass: PlayerFacade },
        { provide: IGameFacadeToken, useClass: GameFacade },
        { provide: IGameSaveFacadeToken, useClass: GameSaveFacade },

        { provide: IPlayerServiceToken, useClass: PlayerService },
        { provide: IGameServiceToken, useClass: GameService },
        { provide: IGameSaveServiceToken, useClass: GameSaveService },

        PlayerRepository,
        GameRepository,
        GameSaveRepository,
    ],
    controllers: [GameController, GameSaveController, GamePlayerController],
})
export class GameModule {}
