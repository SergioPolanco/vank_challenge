import * as Joi from "joi"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from "src/common/database";
import { UserModule } from "src/users";
import { RegistrationModule } from "src/registration";
import { InvoiceModule } from "src/invoices";
import { BankModule } from "src/banks";
import { NODE_ENV } from "./constants/app.constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required().valid(
          NODE_ENV.DEVELOPMENT,
          NODE_ENV.PRODUCTION
        ),
        INVOICE_FILE_URL: Joi.string().required(),
        CURRENCY_CONVERTER_URL: Joi.string().required(),
        FREE_CURRENCY_API_KEY:  Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required()
      })
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    RegistrationModule,
    UserModule,
    InvoiceModule,
    BankModule
  ]
})
export class AppModule {}