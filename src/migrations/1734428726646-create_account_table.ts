import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateAccountTable1734428726646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'account',
                columns: [
                    {
                        name: 'account_id',
                        type: 'bigint',
                        isPrimary: true,
                        unsigned: true,
                        generationStrategy: 'increment',
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'avatar',
                        type: 'TEXT',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'provider',
                        type: 'tinyint',
                        comment: 'LOCAL=0, GOOGLE=1, FACEBOOK=2, APPlE=3',
                        unsigned: true,
                        isNullable: false,
                    },
                    {
                        name: 'provider_id',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'tinyint',
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

        await queryRunner.createIndex(
            'account',
            new TableIndex({
                name: 'IDX_account_email',
                columnNames: ['email'],
            }),
        )

        await queryRunner.createIndex(
            'account',
            new TableIndex({
                name: 'IDX_account_provider',
                columnNames: ['provider_id', 'provider'],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('account', 'IDX_account_provider')
        await queryRunner.dropIndex('account', 'IDX_account_email')
        await queryRunner.dropTable('account')
    }

}
