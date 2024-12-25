import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'

import { IPlayerService } from '../interfaces/player.service.interface'

import { PlayerRepository } from '../repositories/player.repository'

import { PlayerEntity } from '../entities/player.entity'

import { CreatePlayerRequest } from '../dto/request/player/create-player.dto'
import { UpdatePlayerRequest } from '../dto/request/player/update-player.dto'
import { PlayerDTO } from '../dto/response/player/player.dto'

@Injectable()
export class PlayerService implements IPlayerService {
    constructor(@InjectRepository(PlayerRepository) private playerRepository: PlayerRepository) {}

    async createPlayer(gameId: number, accountId: number, request: CreatePlayerRequest): Promise<PlayerDTO> {
        await this._checkPlayerNameExists(gameId, request.name)

        const result: PlayerEntity = await this.playerRepository.createPlayer(gameId, accountId, request)

        return plainToInstance(PlayerDTO, result)
    }

    async deletePlayer(gameId: number, accountId: number, playerId: number): Promise<void> {
        await this._validatePlayerExists(gameId, accountId, playerId)

        return this.playerRepository.deletePlayer(gameId, accountId, playerId)
    }

    async getPlayers(gameId: number, accountId: number): Promise<PlayerDTO[]> {
        const result: PlayerEntity[] = await this.playerRepository.getPlayers(gameId, accountId)

        return plainToInstance(PlayerDTO, result)
    }

    async updatePlayer(
        gameId: number,
        accountId: number,
        playerId: number,
        request: UpdatePlayerRequest,
    ): Promise<PlayerDTO> {
        const player: PlayerEntity = await this._validatePlayerExists(gameId, accountId, playerId)
        if (request.name != player.name) {
            // Rename
            await this._checkPlayerNameExists(gameId, request.name, playerId)
        }

        const result: PlayerEntity = await this.playerRepository.updatePlayer(player, request)

        return plainToInstance(PlayerDTO, result)
    }

    async _checkPlayerNameExists(gameId: number, name: string, exceptPlayerId?: number): Promise<void> {
        const player: PlayerEntity = await this.playerRepository.findPlayerByName(gameId, name, exceptPlayerId)

        if (player) {
            throw new ConflictException('This name already taken')
        }
    }

    async _validatePlayerExists(gameId: number, accountId: number, playerId: number): Promise<PlayerEntity> {
        const player: PlayerEntity = await this.playerRepository.getPlayer(gameId, accountId, playerId)

        if (!player) {
            throw new NotFoundException('Player not found')
        }

        return player
    }
}
