import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdStageTable1734667356356 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_stage',
                columns: [
                    {
                        name: 'td_stage_id',
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
                        name: 'description',
                        type: 'varchar',
                        length: '255',
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
            'td_enemy',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_td_stage_game_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('td_stage', 'FK_td_stage_game_id')
        await queryRunner.dropTable('td_stage')
    }
}
