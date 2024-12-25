import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { GameStatus } from '../libraries/enum/enums'

export class CreateGameTable1734667356351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'game',
                columns: [
                    {
                        name: 'game_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'game_code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'game_image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'game_status',
                        type: 'tinyint',
                        unsigned: true,
                        default: GameStatus.INACTIVE,
                    },
                    {
                        name: 'max_number_players',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                    },
                    {
                        name: 'max_number_game_saves',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                    },
                    {
                        name: 'reset_time',
                        type: 'time',
                        isNullable: false,
                        default: '00:00:00',
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'datetime',
                        isNullable: true,
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('game')
    }
}
