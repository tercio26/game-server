import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'

import { IGameService } from '../interfaces/game.service.interface'

import { GameRepository } from '../repositories/game.repository'

import { GameDTO } from '../dto/response/game.dto'

@Injectable()
export class GameService implements IGameService {
    constructor(@InjectRepository(GameRepository) private gameRepository: GameRepository) {}

    async getGame(gameId: number): Promise<GameDTO> {
        const game = await this.gameRepository.findOneBy({ gameId })
        if (!game) {
            throw new NotFoundException('Game not found')
        }
        return plainToInstance(GameDTO, game)
    }
}
