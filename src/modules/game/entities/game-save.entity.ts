import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('game_save')
export class GameSaveEntity {
    @PrimaryGeneratedColumn({ name: 'game_save_id' })
    gameSaveId: number

    @Column({ name: 'game_id', type: 'bigint' })
    gameId?: number

    @Column({ name: 'player_id', type: 'bigint' })
    playerId: number

    @Column({ name: 'data', type: 'text' })
    data?: any

    @Column({ name: 'created_at', type: 'datetime' })
    createdAt?: Date

    @Column({ name: 'updated_at', type: 'datetime' })
    updatedAt: Date
}
