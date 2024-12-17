import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUserTable1734428726646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "user_id",
                        type: "bigint",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "avatar_path",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "provider",
                        type: "tinyint",
                        isNullable: false,
                    },
                    {
                        name: "provider_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "tinyint",
                        isNullable: false,
                    },
                    {
                        name: "token",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "remember_token",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "token_expired_at",
                        type: "datetime",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "datetime",
                        isNullable: true,
                    },
                ],
            }),
            true,
        )

        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_user_email",
                columnNames: ["email"],
            }),
        )

        await queryRunner.createIndex(
            "user",
            new TableIndex({
                name: "IDX_user_provider",
                columnNames: ["provider_id", "provider"],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("user", "IDX_user_provider")
        await queryRunner.dropIndex("user", "IDX_user_email")
        await queryRunner.dropTable("user")
    }

}
