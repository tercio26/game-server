import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTagTable1734667356352 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tag',
                columns: [
                    {
                        name: 'tag_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'tag_name',
                        type: 'varchar',
                        length: '32',
                        isNullable: false,
                    },
                ],
            }),
            true,
        )

        await queryRunner.query(
            `INSERT INTO tag (tag_name) VALUES ('TOWER_DEFENSE', 'RPG', 'ACTION', 'ADVENTURE', 'PUZZLE')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tag')
    }
}
