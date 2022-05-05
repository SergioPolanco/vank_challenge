import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankService } from './services/bank.service';
import { BankController } from './controllers/bank.controller';
import { BankPopulator } from './populators/bank.populator';
import { BankRepository } from './repositories/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankRepository])],
  providers: [BankService, BankPopulator],
  exports: [BankService],
  controllers: [BankController],
})
export class BankModule {}
