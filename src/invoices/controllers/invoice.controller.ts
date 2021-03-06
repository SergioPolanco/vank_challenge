import {
  Controller,
  Get,
  Query,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceDto } from '../dtos/invoice.dto';
import { QueryStringInvoiceDto } from '../dtos/querystring-invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly _invoiceService: InvoiceService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  @ApiOperation({ summary: 'Retrieve incoices' })
  @ApiOkResponse({ type: InvoiceDto, isArray: true })
  async findAll(
    @Query() queryString: QueryStringInvoiceDto,
  ): Promise<InvoiceEntity[]> {
    const invoices = await this._invoiceService.find(queryString);
    return invoices;
  }
}
