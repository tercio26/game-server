import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import { AccountStatus } from '../libraries/enum/account.enum'

export class CreatePlayerTable1734667514202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'player',
                columns: [
                    {
                        name: 'player_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'account_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: 'game_id',
                        type: 'bigint',
                        isNullable: false,
                        unsigned: true,
                    },
                    {
                        name: 'status',
                        type: 'tinyint',
                        default: AccountStatus.ACTIVE,
                        unsigned: true,
                    },
                    {
                        name: 'energy',
                        type: 'int',
                        unsigned: true,
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'gold',
                        type: 'int',
                        unsigned: true,
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'gems',
                        type: 'int',
                        unsigned: true,
                        isNullable: false,
                        default: 0,
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
            'player',
            new TableForeignKey({
                columnNames: ['game_id'],
                referencedColumnNames: ['game_id'],
                referencedTableName: 'game',
                onDelete: 'CASCADE',
                name: 'FK_player_game_id',
            }),
        )

        await queryRunner.createForeignKey(
            'player',
            new TableForeignKey({
                columnNames: ['account_id'],
                referencedColumnNames: ['account_id'],
                referencedTableName: 'account',
                onDelete: 'CASCADE',
                name: 'FK_player_account_id',
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('player', 'FK_player_game_id')
        await queryRunner.dropForeignKey('player', 'FK_player_account_id')
        await queryRunner.dropTable('player')
    }

}
