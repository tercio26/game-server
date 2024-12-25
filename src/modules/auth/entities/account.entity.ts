import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AccountStatus, AccountProvider } from '../../../libraries/enum/account.enum'

@Entity('account')
export class AccountEntity {
    @PrimaryGeneratedColumn({ name: 'account_id', type: 'bigint' })
    accountId: number

    @Column({ name: 'username', type: 'varchar', nullable: true })
    username: string

    @Column({ name: 'avatar_path', type: 'varchar',nullable: true })
    avatarPath: string

    @Column({ name: 'email', type: 'varchar', nullable: true })
    email: string

    @Column({ name: 'password', type: 'varchar', nullable: true })
    password: string

    @Column({ name: 'provider', type: 'tinyint', nullable: true })
    provider: AccountProvider

    @Column({ name: 'provider_id', type: 'varchar', nullable: true })
    providerId: string // ThirdParty ID

    @Column({ name: 'status', type: 'tinyint' })
    status: AccountStatus

    @Column({ type: 'datetime', name: 'created_at' })
    createdAt: Date

    @Column({ type: 'datetime', name: 'updated_at' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
    deletedAt: Date
}
