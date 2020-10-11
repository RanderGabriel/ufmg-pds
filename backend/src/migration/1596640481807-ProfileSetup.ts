import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileSetup1596640481807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into profile (name) values ("MECHANIC")`);
        await queryRunner.query(`insert into profile (name) values ("DRIVER")`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('delete from profile');
        await queryRunner.query(`alter table profile auto_increment = 1`);
    }

}
