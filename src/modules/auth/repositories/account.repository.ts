import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { AccountEntity } from '../entities/account.entity'
import { AccountProvider, AccountStatus } from '../../../libraries/enum/account.enum'
import { LoginRequest } from '../dto/request/login.dto'

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
    constructor(private dataSource: DataSource) {
        super(AccountEntity, dataSource.createEntityManager())
    }
    
    getAccountByProvider(provider: AccountProvider, providerId: string): Promise<AccountEntity> {
        return this.findOne({ where: { provider, providerId } })
    }

    async registerLocalAccount(email: string, hashedPassword: string): Promise<AccountEntity> {
        const account = this.create({
            provider: AccountProvider.LOCAL,
            email,
            password: hashedPassword,
            username: await this._generateUsername(),
            status: AccountStatus.ACTIVE,
        })

        return this.save(account)
    }

    async registerByProvider(request: LoginRequest): Promise<AccountEntity> {
        const account = this.create({
            provider: request.provider,
            providerId: request.providerId,
            email: request.email,
            username: await this._generateUsername(),
            avatarPath: request.avatarPath,
            status: AccountStatus.ACTIVE,
        })

        return this.save(account)
    }

    async _generateUsername(): Promise<string> {
        const lastId = await this.createQueryBuilder('u')
            .select('MAX(account_id)', 'accountId')
            .getRawOne().then(result => result.accountId) || 0
        const id = parseInt(lastId) + 1

        return `Dreamer${id.toString().padStart(8, '0')}`
    }
}
