import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdItemTypeTable1734667356360 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_item_type',
                columns: [
                    {
                        name: 'td_item_type_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'image',
                        type: 'text',
                        isNullable: true,
                    },
                ],
            }),
            true,
        )

        await queryRunner.query(
            `INSERT INTO td_item_type (name) VALUES (
                'RESOURCES', 'DEFENDER_PIECES', 'ACCESSORY_PIECES', 'KEY')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('td_item_type')
    }
}
