import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdItemRarityTable1734667356360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_item_rarity',
                columns: [
                    {
                        name: 'td_item_rarity_id',
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
                        length: '128',
                        isNullable: false,
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                        length: '128',
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
            'td_item_rarity',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_td_item_rarity_game_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('td_item_rarity', 'FK_td_item_rarity_game_id')
        await queryRunner.dropTable('td_item_rarity')
    }
}
