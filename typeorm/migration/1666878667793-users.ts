import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { idColumn } from "../utils/idColumn";
import { varcharColumns } from "../utils/varcharColumns";

export class users1666878667793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
                idColumn('id'),
                varcharColumns('name','100',false),
                varcharColumns('email','255',false),
                varcharColumns('password','64',false),
            ],
        }),);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
