import { Module, CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/users';
import { BankModule } from 'src/banks';
import { InvoiceService } from './services/invoice.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { InvoiceTask } from './tasks/invoice.task';
import { InvoiceExternalService } from './services/invoice-external.service';
import { InvoicePopulator } from './populators/invoices.populator';
import { InvoiceController } from './controllers/invoice.controller';
import { CsvParser } from './utils/csv-parser.util';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([InvoiceRepository]),
    HttpModule,
    ConfigModule,
    UserModule,
    BankModule,
  ],
  providers: [
    InvoiceService,
    InvoiceExternalService,
    InvoicePopulator,
    InvoiceTask,
    CsvParser,
  ],
  exports: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
