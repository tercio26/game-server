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
        const data = this.create({
            username: await this._generateUsername(),
            status: AccountStatus.ACTIVE,
            provider: AccountProvider.LOCAL,

            email,
            password: hashedPassword,
        })

        return this.save(data)
    }

    async registerByProvider(
        provider: AccountProvider,
        providerId: string,
        email: string,
        avatarPath?: string,
    ): Promise<AccountEntity> {
        const data = this.create({
            username: await this._generateUsername(),
            status: AccountStatus.ACTIVE,

            provider: provider,
            providerId: providerId,
            email: email,
            avatarPath: avatarPath,
        })

        return this.save(data)
    }

    async _generateUsername(): Promise<string> {
        const lastId =
            (await this.createQueryBuilder('u')
                .select('MAX(account_id)', 'accountId')
                .getRawOne()
                .then(result => result.accountId)) || 0
        const id = parseInt(lastId) + 1

        return `dreamer${id.toString().padStart(8, '0')}`
    }
}
