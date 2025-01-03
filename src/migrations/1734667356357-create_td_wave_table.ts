import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdWaveTable1734667356357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_wave',
                columns: [
                    {
                        name: 'td_wave_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'td_stage_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'start_time',
                        type: 'time',
                        isNullable: false,
                    },
                    {
                        name: 'order',
                        type: 'int',
                        unsigned: true,
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
            'td_wave',
            new TableForeignKey({
                columnNames: ['td_stage_id'],
                referencedColumnNames: ['td_stage_id'],
                referencedTableName: 'td_stage',
                onDelete: 'CASCADE',
                name: 'FK_td_wave_td_stage_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('td_wave', 'FK_td_wave_td_stage_id')
        await queryRunner.dropTable('td_wave')
    }
}
