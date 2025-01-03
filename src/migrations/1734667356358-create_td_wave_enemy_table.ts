import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdWaveEnemyTable1734667356358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_wave_enemy',
                columns: [
                    {
                        name: 'td_wave_enemy_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'td_wave_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'td_enemy_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'time_spawn',
                        type: 'time',
                        isNullable: false,
                    },

                    {
                        name: 'hp',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'armor',
                        type: 'int',
                        unsigned: true,
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'speed',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'attack',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'xp',
                        type: 'int',
                        unsigned: true,
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        unsigned: true,
                        default: 1,
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
            'td_wave_enemy',
            new TableForeignKey({
                columnNames: ['td_wave_id'],
                referencedColumnNames: ['td_wave_id'],
                referencedTableName: 'td_wave',
                onDelete: 'CASCADE',
                name: 'FK_td_wave_enemy_td_wave_id',
            }),
        )

        await queryRunner.createForeignKey(
            'td_wave_enemy',
            new TableForeignKey({
                columnNames: ['td_enemy_id'],
                referencedColumnNames: ['td_enemy_id'],
                referencedTableName: 'td_enemy',
                onDelete: 'CASCADE',
                name: 'FK_td_wave_enemy_td_enemy_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('td_wave_enemy', 'FK_td_wave_enemy_td_wave_id')
        await queryRunner.dropForeignKey('td_wave_enemy', 'FK_td_wave_enemy_td_enemy_id')
        await queryRunner.dropTable('td_wave_enemy')
    }
}
