import { Module } from "@nestjs/common";
import { UserModule } from "src/users";
import { RegistrationService } from "./services/registration.service";
import { RegistrationController } from "./controllers/registration.controller";

@Module({
  imports: [UserModule],
  providers: [RegistrationService],
  controllers: [RegistrationController]
})
export class RegistrationModule {}