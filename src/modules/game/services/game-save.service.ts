import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'

import { IGameSaveService } from '../interfaces/game-save.service.interface'

import { GameSaveRepository } from '../repositories/game-save.repository'

import { GameSaveEntity } from '../entities/game-save.entity'
import { GameSaveRequest } from '../dto/request/game-save.dto'
import { GameSaveDTO } from '../dto/response/game-save.dto'

@Injectable()
export class GameSaveService implements IGameSaveService {
    constructor(@InjectRepository(GameSaveRepository) private gameSaveRepository: GameSaveRepository) {}

    async delete(gameId: number, _accountId: number, playerId: number, gameSaveId?: number): Promise<void> {
        await this._validateGameSaveExists(gameId, playerId, gameSaveId)

        await this.gameSaveRepository.delete({
            gameId,
            gameSaveId,
            playerId,
        })
    }

    async get(gameId: number, _accountId: number, playerId: number): Promise<GameSaveDTO[]> {
        const result: GameSaveEntity[] = await this.gameSaveRepository.find({
            select: {
                gameSaveId: true,
                gameId: true,
                playerId: true,
                updatedAt: true,
            },
            where: { gameId, playerId },
        })
        return plainToInstance(GameSaveDTO, result)
    }

    async load(gameId: number, _accountId: number, playerId: number, gameSaveId?: number): Promise<GameSaveDTO> {
        const result = await this._validateGameSaveExists(gameId, playerId, gameSaveId)
        return plainToInstance(GameSaveDTO, result)
    }

    async save(
        gameId: number,
        _accountId: number,
        playerId: number,
        request: GameSaveRequest,
        gameSaveId?: number,
    ): Promise<number> {
        let gameSave: GameSaveEntity
        if (gameSaveId) {
            gameSave = await this._validateGameSaveExists(gameId, playerId, gameSaveId)
        } else {
            gameSave = this.gameSaveRepository.create({
                gameId,
                playerId,
                data: request.data,
            })
        }
        gameSave = await this.gameSaveRepository.save(gameSave)
        return gameSave.gameSaveId
    }

    async _validateGameSaveExists(gameId: number, playerId: number, gameSaveId: number): Promise<GameSaveEntity> {
        const gameSave: GameSaveEntity = await this.gameSaveRepository.findOneBy({ gameId, playerId, gameSaveId })
        if (!gameSave) {
            throw new NotFoundException('Game not found')
        }
        return gameSave
    }
}
