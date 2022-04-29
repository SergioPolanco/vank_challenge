import * as Joi from "joi"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { DatabaseModule } from "src/database";
import { UserModule } from "src/users";
import { RegistrationModule } from "src/registration";
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
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required()
      })
    }),
    DatabaseModule,
    RegistrationModule,
    UserModule
  ]
})
export class AppModule {}