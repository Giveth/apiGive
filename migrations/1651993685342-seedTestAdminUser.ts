import { MigrationInterface, QueryRunner } from "typeorm"
import { SEED_DATA } from "../test/testUtils";
import { genSaltSync, hashSync } from "bcrypt";

export class seedTestAdminUser1651993685342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!['development', 'test'].includes(process.env.NODE_ENV as string)) {
            console.log(
              'We just seed admin in development and test environments',
            );
            return;
        }
        const salt = process.env.BCRYPT_SALT
        if (!salt){
            throw new Error('You should fill BCRYPT_SALT in development.env, if you dont know how generate it check\nhttps://github.com/kelektiv/node.bcrypt.js#to-hash-a-password-1')
        }
        const encryptedPassword = hashSync(SEED_DATA.FIRST_ADMIN.password, salt);
        await queryRunner.query(`
            INSERT INTO public.admin(
            id, "firstName", "lastName", role, email, "encryptedPassword")
            VALUES (${SEED_DATA.FIRST_ADMIN.id}, '${SEED_DATA.FIRST_ADMIN.firstName}', '${SEED_DATA.FIRST_ADMIN.lastName}', '${SEED_DATA.FIRST_ADMIN.role}', '${SEED_DATA.FIRST_ADMIN.email}', '${encryptedPassword}');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
