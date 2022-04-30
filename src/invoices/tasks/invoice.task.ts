import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoicePopulator } from '../populators/invoices.populator';

@Injectable()
export class InvoiceTask {
  private readonly logger = new Logger(InvoiceTask.name);

  constructor(private readonly _invoicePopulator: InvoicePopulator) {}
  
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'America/Santiago',
  })
  async invoicePopulatorCron() {
    await this._invoicePopulator.insertInvoices();
  }
}