import { MigrationInterface, QueryRunner } from "typeorm"

export class createAdminTable1651737575967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `
          CREATE TABLE IF NOT EXISTS public.admin
(
    id SERIAL NOT NULL,
    "firstName" character varying COLLATE pg_catalog."default",
    "lastName" character varying COLLATE pg_catalog."default",
    role  character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "encryptedPassword" character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY (id)
)
          `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS admin`);

    }

}
