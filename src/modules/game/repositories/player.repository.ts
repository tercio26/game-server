import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { AccountEntity } from '../../auth/entities/account.entity'

@Injectable()
export class PlayerRepository extends Repository<AccountEntity> {
    constructor(private dataSource: DataSource) {
        super(AccountEntity, dataSource.createEntityManager())
    }

}
