import { GameSaveRequest } from '../dto/request/game-save.dto'
import { GameSaveDTO } from '../dto/response/game-save.dto'

export const IGameSaveServiceToken: string = 'IGameSaveService'

export interface IGameSaveService {
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
