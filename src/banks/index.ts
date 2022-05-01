import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './services/bank.service';
import { BankPopulator } from './populators/bank.populator';
import { BankRepository } from './repositories/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankRepository])],
  providers: [BankService, BankPopulator],
  exports: [BankService],
})
export class BankModule {}
