import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { GameEntity } from '../entities/game.entity'

@Injectable()
export class GameRepository extends Repository<GameEntity> {
    constructor(private dataSource: DataSource) {
        super(GameEntity, dataSource.createEntityManager())
    }

}
