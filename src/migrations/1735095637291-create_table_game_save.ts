import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { AccountStatus } from '../libraries/enum/account.enum';

export class CreateTableGameSave1735095637291 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'game_save',
                columns: [
                    {
                        name: 'game_save_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'game_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: 'player_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: 'data',
                        type: 'text',
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
                ],
            }),
            true,
        )

        await queryRunner.createForeignKey(
            'game_save',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_game_save_game_id',
            }),
        )

        await queryRunner.createForeignKey(
            'game_save',
            new TableForeignKey({
                columnNames: ['player_id'],
                referencedColumnNames: ['player_id'],
                referencedTableName: 'player',
                onDelete: 'CASCADE',
                name: 'FK_game_save_player_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('game_save', 'FK_game_save_game_id')
        await queryRunner.dropForeignKey('game_save', 'FK_game_save_player_id')
        await queryRunner.dropTable('game_save')
    }

}
