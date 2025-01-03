import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdEnemyTable1734667356355 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_enemy',
                columns: [
                    {
                        name: 'td_enemy_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'game_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'image',
                        type: 'TEXT',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'TEXT',
                        isNullable: true,
                    },
                    {
                        name: 'base_hp',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'base_armor',
                        type: 'int',
                        unsigned: true,
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'base_speed',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'base_attack',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'base_xp',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'td_enemy_type_id',
                        type: 'bigint',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'is_boss',
                        type: 'tinyint',
                        unsigned: true,
                        default: 0,
                        isNullable: false,
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

        await queryRunner.createForeignKey(
            'td_enemy',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_td_enemy_game_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('td_enemy', 'FK_td_enemy_game_id')
        await queryRunner.dropTable('td_enemy')
    }
}
