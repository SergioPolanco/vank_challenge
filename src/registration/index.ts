import { Module } from '@nestjs/common';
import { UserModule } from 'src/users';
import { BankModule } from 'src/banks';
import { RegistrationService } from './services/registration.service';
import { RegistrationController } from './controllers/registration.controller';

@Module({
  imports: [UserModule, BankModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
