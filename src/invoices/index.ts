import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from 'src/utils';
import { UserModule } from 'src/users';
import { BankModule } from 'src/banks';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceTask } from './tasks/invoice.task';
import { InvoiceExternalService } from './services/invoice-external.service';
import { InvoicePopulator } from './populators/invoices.populator';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceRepository]),
    HttpModule,
    ConfigModule,
    UtilsModule,
    UserModule,
    BankModule
  ],
  providers: [InvoiceService, InvoiceExternalService, InvoicePopulator, InvoiceTask],
  exports: [InvoiceService]
})
export class InvoiceModule {}