import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserStatus, UserProvider } from '../../../libraries/enum/user.enum'

/**
 * Users entity
 */
@Entity()
export class User {
	@PrimaryGeneratedColumn({ name: 'user_id' })
	userId: number

	@Column({ name: 'name', nullable: true })
	name: string

	@Column({ name: 'avatar_path', nullable: true })
	avatarPath: string

	@Column({ nullable: true })
	email: string

	@Column({ nullable: true })
	password: string

	@Column({ nullable: true })
	provider: UserProvider

	@Column({ name: 'provider_id', nullable: true })
	providerId: string // ThirdParty ID

	@Column()
	status: UserStatus

	@Column({ nullable: true })
	token: string

	@Column({ name: 'remember_token' })
	rememberToken: string

	@Column({ name: 'token_expired_at' })
	tokenExpiredAt: Date

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
	deletedAt: Date
}
