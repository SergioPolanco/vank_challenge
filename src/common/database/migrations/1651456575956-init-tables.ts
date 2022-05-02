import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1651456575956 implements MigrationInterface {
    name = 'initTables1651456575956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_name" character varying NOT NULL, "internal_code" integer NOT NULL, "tributary_id" character varying NOT NULL, "currency" character varying NOT NULL, "api_calls" integer NOT NULL, CONSTRAINT "PK_d5637f2d30aca4e2a68b408ff8c" PRIMARY KEY ("internal_code"))`);
        await queryRunner.query(`CREATE TABLE "invoices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "number" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "total" integer NOT NULL, "payment_total" integer NOT NULL, "credit_total" integer NOT NULL, "due_date" TIMESTAMP NOT NULL, "payment_date" TIMESTAMP, "currency" character varying NOT NULL, "vendor_id" integer NOT NULL, "bank_id" integer NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "banks" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3975b5f684ec241e3901db62d77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_banks_banks" ("users_internal_code" integer NOT NULL, "banks_id" integer NOT NULL, CONSTRAINT "PK_b509999a92a7eda68bc69fe8f68" PRIMARY KEY ("users_internal_code", "banks_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_baaf40912b6adb792fbd257276" ON "users_banks_banks" ("users_internal_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_58da2e86da3dbbedba7376378b" ON "users_banks_banks" ("banks_id") `);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_ec4347c412aca9855a8076d57c0" FOREIGN KEY ("vendor_id") REFERENCES "users"("internal_code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoices" ADD CONSTRAINT "FK_b42a4b034296cceca28539a2813" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_banks_banks" ADD CONSTRAINT "FK_baaf40912b6adb792fbd2572760" FOREIGN KEY ("users_internal_code") REFERENCES "users"("internal_code") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_banks_banks" ADD CONSTRAINT "FK_58da2e86da3dbbedba7376378b6" FOREIGN KEY ("banks_id") REFERENCES "banks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_banks_banks" DROP CONSTRAINT "FK_58da2e86da3dbbedba7376378b6"`);
        await queryRunner.query(`ALTER TABLE "users_banks_banks" DROP CONSTRAINT "FK_baaf40912b6adb792fbd2572760"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_b42a4b034296cceca28539a2813"`);
        await queryRunner.query(`ALTER TABLE "invoices" DROP CONSTRAINT "FK_ec4347c412aca9855a8076d57c0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58da2e86da3dbbedba7376378b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_baaf40912b6adb792fbd257276"`);
        await queryRunner.query(`DROP TABLE "users_banks_banks"`);
        await queryRunner.query(`DROP TABLE "banks"`);
        await queryRunner.query(`DROP TABLE "invoices"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
