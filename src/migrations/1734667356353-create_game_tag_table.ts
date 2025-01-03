import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateGameTagTable1734667356353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'game_tag',
                columns: [
                    {
                        name: 'game_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'tag_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                    },
                ],
            }),
            true,
        )
        await queryRunner.createPrimaryKey('game_tag', ['game_id', 'tag_id'])

        await queryRunner.createForeignKey(
            'game_tag',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_game_tag_game_id',
            }),
        )

        await queryRunner.createForeignKey(
            'game_tag',
            new TableForeignKey({
                columnNames: ['tag_id'],
                referencedColumnNames: ['tag_id'],
                referencedTableName: 'tag',
                onDelete: 'CASCADE',
                name: 'FK_game_tag_tag_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('game_tag', 'FK_game_tag_game_id')
        await queryRunner.dropForeignKey('game_tag', 'FK_game_tag_tag_id')
        await queryRunner.dropTable('game_tag')
    }
}
