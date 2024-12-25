import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { GameEntity } from '../entities/game.entity'
import { GameSaveEntity } from '../entities/game-save.entity';

@Injectable()
export class GameSaveRepository extends Repository<GameSaveEntity> {
    constructor(private dataSource: DataSource) {
        super(GameEntity, dataSource.createEntityManager())
    }

}
