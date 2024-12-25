import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('player')
export class PlayerEntity {
    @PrimaryGeneratedColumn({ name: 'player_id', type: 'bigint' })
    playerId: number

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name: 'account_id', type: 'bigint' })
    accountId: number

    @Column({ name: 'game_id', type: 'bigint' })
    gameId: number

    @Column({ name: 'energy', type: 'int' })
    energy: number

    @Column({ name: 'gold', type: 'int' })
    gold: number

    @Column({ name: 'gems', type: 'int' })
    gems: number

    @Column({ name: 'created_at', type: 'datetime' })
    createdAt?: Date

    @Column({ name: 'updated_at', type: 'datetime' })
    updatedAt?: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt?: Date
}
