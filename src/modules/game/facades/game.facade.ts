import { Inject, Injectable } from '@nestjs/common'

import { IGameFacade } from '../interfaces/game.facade.interface'
import { IGameService, IGameServiceToken } from '../interfaces/game.service.interface'

import { GameDTO } from '../dto/response/game.dto'

@Injectable()
export class GameFacade implements IGameFacade {
    constructor(@Inject(IGameServiceToken) private readonly gameService: IGameService) {}

    getGame(gameId: number): Promise<GameDTO> {
        return this.gameService.getGame(gameId)
    }
}
