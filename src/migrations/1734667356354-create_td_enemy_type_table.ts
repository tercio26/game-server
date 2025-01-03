import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateTdEnemyTypeTable1734667356354 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'td_enemy_type',
                columns: [
                    {
                        name: 'td_enemy_type_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                ],
            }),
            true,
        )

        await queryRunner.query(
            `INSERT INTO td_enemy_type (name) VALUES ('MELEE', 'RANGED', 'CALVARY', 'SIEGE', 'FLYING')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('td_enemy_type')
    }
}
