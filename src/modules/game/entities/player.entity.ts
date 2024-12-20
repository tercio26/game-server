import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PlayerEntity {
	@PrimaryGeneratedColumn({ name: 'player_id' })
	playerId: number

	@Column({ name: 'name' })
	name: string

	@Column({ name: 'account_id' })
	accountId: number

	@Column({ name: 'game_id' })
	gameId: number

	@Column({ name: 'energy' })
	energy: number

	@Column({ name: 'gold' })
	gold: number

	@Column({ name: 'gems' })
	gems: number

	@Column({ type: 'datetime', name: 'created_at' })
	createdAt: Date

	@Column({ type: 'datetime', name: 'updated_at' })
	updatedAt: Date

	@DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
	deletedAt: Date
}
