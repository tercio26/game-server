import { CreatePlayerRequest } from '../dto/request/player/create-player.dto'
import { UpdatePlayerRequest } from '../dto/request/player/update-player.dto'
import { PlayerDTO } from '../dto/response/player/player.dto'

export const IPlayerFacadeToken: string = 'IPlayerFacade'

export interface IPlayerFacade {
    createPlayer(gameId: number, accountId: number, request: CreatePlayerRequest): Promise<PlayerDTO>

    deletePlayer(gameId: number, accountId: number, playerId: number): Promise<void>

    getPlayers(gameId: number, accountId: number): Promise<PlayerDTO[]>

    updatePlayer(gameId: number, accountId: number, playerId: number, request: UpdatePlayerRequest): Promise<PlayerDTO>
}
