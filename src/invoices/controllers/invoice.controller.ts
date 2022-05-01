import { Controller, Get, Query } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceEntity } from '../entities/invoice.entity';
import { QueryStringInvoiceDto } from '../dtos/querystring-invoice.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly _invoiceService: InvoiceService) {}

  @Get()
  async findAll(
    @Query() queryString: QueryStringInvoiceDto
  ): Promise<InvoiceEntity[]> {
    const invoices = await this._invoiceService.find(queryString)
    return invoices
  }
}