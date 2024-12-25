import { Inject, Injectable } from '@nestjs/common'

import { IGameSaveFacade } from '../interfaces/game-save.facade.interface'
import { IGameSaveService, IGameSaveServiceToken } from '../interfaces/game-save.service.interface'

import { GameSaveRequest } from '../dto/request/game-save.dto'
import { GameSaveDTO } from '../dto/response/game-save.dto'

@Injectable()
export class GameSaveFacade implements IGameSaveFacade {
    constructor(@Inject(IGameSaveServiceToken) private readonly gameSaveService: IGameSaveService) {}

    delete(gameId: number, accountId: number, playerId: number, gameSaveId?: number): Promise<void> {
        return this.gameSaveService.delete(gameId, accountId, playerId, gameSaveId)
    }

    get(gameId: number, accountId: number, playerId: number): Promise<GameSaveDTO[]> {
        return this.gameSaveService.get(gameId, accountId, playerId)
    }

    load(gameId: number, accountId: number, playerId: number, gameSaveId?: number): Promise<GameSaveDTO> {
        return this.gameSaveService.load(gameId, accountId, playerId, gameSaveId)
    }

    save(
        gameId: number,
        accountId: number,
        playerId: number,
        request: GameSaveRequest,
        gameSaveId?: number,
    ): Promise<number> {
        return this.gameSaveService.save(gameId, accountId, playerId, request, gameSaveId)
    }
}
