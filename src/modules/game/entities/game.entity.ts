import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('game')
export class GameEntity {
    @PrimaryGeneratedColumn({ name: 'game_id', type: 'bigint' })
    gameId: number

    @Column({ name: 'name', type: 'varchar' })
    name: string

    @Column({ name: 'game_code', type: 'varchar' })
    gameCode: string

    @Column({ name: 'game_image', type: 'varchar', nullable: true })
    gameImage: string

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string

    @Column({ name: 'game_status', type: 'tinyint' })
    gameStatus: number

    @Column({ name: 'max_number_players', type: 'int' })
    maxNumberPlayers: number

    @Column({ name: 'max_number_game_saves', type: 'int' })
    maxNumberGameSaves: number

    @Column({ name: 'reset_time', type: 'time' })
    resetTime: string

    @Column({ name: 'created_at', type: 'datetime' })
    createdAt?: Date

    @Column({ name: 'updated_at', type: 'datetime' })
    updatedAt?: Date

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
    deletedAt?: Date
}
