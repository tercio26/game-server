import { Injectable } from '@nestjs/common'
import { DataSource, Repository, Not, FindOptionsWhere } from 'typeorm'
import { PlayerEntity } from '../entities/player.entity'
import { CreatePlayerRequest } from '../dto/request/player/create-player.dto'
import { UpdatePlayerRequest } from '../dto/request/player/update-player.dto'
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PlayerRepository extends Repository<PlayerEntity> {
    constructor(private dataSource: DataSource) {
        super(PlayerEntity, dataSource.createEntityManager())
    }

    createPlayer(gameId: number, accountId: number, request: CreatePlayerRequest): Promise<PlayerEntity> {
        const data = this.create({
            gameId: gameId,
            accountId: accountId,
            gems: 0,
            gold: 0,
            energy: 0,
            ...request,
        })

        return this.save(data)
    }

    async deletePlayer(gameId: number, accountId: number, playerId: number): Promise<void> {
        await this.softDelete({
            gameId: gameId,
            accountId: accountId,
            playerId: playerId,
        })
    }

    findPlayerByName(gameId: number, name: string, exceptPlayerId?: number): Promise<PlayerEntity> {
        const conditions: FindOptionsWhere<PlayerEntity> = {
            gameId: gameId,
            name: name,
        }
        if (exceptPlayerId) {
            conditions['playerId'] = Not(exceptPlayerId)
        }
        return this.findOneBy(conditions)
    }

    getPlayer(gameId: number, accountId: number, playerId: number): Promise<PlayerEntity> {
        return this.findOneBy({
            gameId: gameId,
            accountId: accountId,
            playerId: playerId,
        })
    }

    getPlayers(gameId: number, accountId: number): Promise<PlayerEntity[]> {
        return this.findBy({
            gameId: gameId,
            accountId: accountId,
        })
    }

    async updatePlayer(player: PlayerEntity, request: UpdatePlayerRequest): Promise<PlayerEntity> {
        const result = plainToInstance(PlayerEntity, {
            ...player,
            ...request,
            updatedAt: new Date(),
        })

        await this.save({
            playerId: player.playerId,
            updatedAt: result.updatedAt,
            ...request,
        })
        return result
    }
}
