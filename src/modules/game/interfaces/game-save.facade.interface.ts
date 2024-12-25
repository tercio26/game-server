import { GameSaveRequest } from '../dto/request/game-save.dto'
import { GameSaveDTO } from '../dto/response/game-save.dto'

export const IGameSaveFacadeToken: string = 'IGameSaveFacade'

export interface IGameSaveFacade {
    delete(gameId: number, accountId: number, playerId: number, gameSaveId?: number): Promise<void>

    get(gameId: number, accountId: number, playerId: number): Promise<GameSaveDTO[]>

    load(gameId: number, accountId: number, playerId: number, gameSaveId?: number): Promise<GameSaveDTO>

    save(
        gameId: number,
        accountId: number,
        playerId: number,
        request: GameSaveRequest,
        gameSaveId?: number,
    ): Promise<number>
}
