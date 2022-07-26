import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLogTable1651305296248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
CREATE TABLE IF NOT EXISTS public.log
(
     id SERIAL NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    "trackId" character varying COLLATE pg_catalog."default" NOT NULL,
    "applicationId" integer,
    "accessTokenId" integer,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    method character varying COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
    scope text COLLATE pg_catalog."default",
    ip text COLLATE pg_catalog."default",
    "statusCode" integer,
    error text COLLATE pg_catalog."default",
    result text COLLATE pg_catalog."default",
    application integer,
    CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY (id),
    CONSTRAINT "FK_12dfd3eec15a6781fac998ddb50" FOREIGN KEY ("accessTokenId")
        REFERENCES public.access_token (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_e8b5ceddd1f241d76fe2a79b057" FOREIGN KEY ("applicationId")
        REFERENCES public.application (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS log`);
  }
}
