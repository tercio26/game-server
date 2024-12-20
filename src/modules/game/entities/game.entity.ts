import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AccountStatus, AccountProvider } from '../../../libraries/enum/account.enum'

@Entity()
export class GameEntity {
	@PrimaryGeneratedColumn({ name: 'game_id' })
	gameId: number

	@Column({ name: 'name' })
	name: string

	@Column({ name: 'game_code' })
	gameCode: string

	@Column({ name: 'game_image', nullable: true })
	gameImage: string

	@Column({ name: 'description', nullable: true })
	description: string

	@Column({ name: 'game_status' })
	gameStatus: number

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
	deletedAt: Date
}
