import { Inject, Injectable } from '@nestjs/common'

import { IPlayerFacade } from '../interfaces/player.facade.interface'
import { IPlayerService, IPlayerServiceToken } from '../interfaces/player.service.interface'

import { CreatePlayerRequest } from '../dto/request/player/create-player.dto'
import { UpdatePlayerRequest } from '../dto/request/player/update-player.dto'
import { PlayerDTO } from '../dto/response/player/player.dto'

@Injectable()
export class PlayerFacade implements IPlayerFacade {
    constructor(@Inject(IPlayerServiceToken) private readonly playerService: IPlayerService) {}

    createPlayer(gameId: number, accountId: number, request: CreatePlayerRequest): Promise<PlayerDTO> {
        return this.playerService.createPlayer(gameId, accountId, request)
    }

    deletePlayer(gameId: number, accountId: number, playerId: number): Promise<void> {
        return this.playerService.deletePlayer(gameId, accountId, playerId)
    }

    getPlayers(gameId: number, accountId: number): Promise<PlayerDTO[]> {
        return this.playerService.getPlayers(gameId, accountId)
    }

    updatePlayer(
        gameId: number,
        accountId: number,
        playerId: number,
        request: UpdatePlayerRequest,
    ): Promise<PlayerDTO> {
        return this.playerService.updatePlayer(gameId, accountId, playerId, request)
    }
}
