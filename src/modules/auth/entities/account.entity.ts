import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AccountStatus, AccountProvider } from '../../../libraries/enum/account.enum'

@Entity()
export class AccountEntity {
	@PrimaryGeneratedColumn({ name: 'account_id' })
	accountId: number

	@Column({ name: 'username', nullable: true })
	username: string

	@Column({ name: 'avatar_path', nullable: true })
	avatarPath: string

	@Column({ nullable: true })
	email: string

	@Column({ nullable: true })
	password: string

	@Column({ nullable: true })
	provider: AccountProvider

	@Column({ name: 'provider_id', nullable: true })
	providerId: string // ThirdParty ID

	@Column()
	status: AccountStatus

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
	deletedAt: Date
}
