import { Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { validate } from "class-validator";
import { CreateInvoiceDto } from "../dtos/invoice.dto";
import { UserService } from "src/users/services/user.service";
import { BankService } from "src/banks/services/bank.service";
import { InvoiceService } from "../services/invoice.service";
import { InvoiceExternalService } from "../services/invoice-external.service";
import { CsvParser } from "src/utils/parsers/csv.parser";
import { CURRENCIES } from "src/common/constants/currencies.constants";

@Injectable()
export class InvoicePopulator {
  private readonly logger = new Logger(InvoicePopulator.name);
  constructor(
    private readonly _invoiceService: InvoiceService,
    private readonly _invoiceExternalService: InvoiceExternalService,
    private readonly _userService: UserService,
    private readonly _bankService: BankService,
    private readonly _csvParser: CsvParser
  ) {}

  async insertInvoices(): Promise<void>{
    const invoicesString = await lastValueFrom(this._invoiceExternalService.getSourceInvoiceFile());
    const invoicesJson = this._csvParser.toJson(invoicesString);
    for (const invoice of invoicesJson.slice(1)) {
      try {
        const vendorId = parseInt(invoice[1])
        const bankId = parseInt(invoice[7])
        const user = await this._userService.findOne(vendorId)
        const bank = await this._bankService.findById(bankId)
        const invoiceObj = this._buildInvoiceData(invoice)
        await this._invoiceService.create(invoiceObj, user, bank)
      } catch (error) {
        this.logger.log(`Error saving invoice: ${invoice[0]}`, error)
      }
    }
  }

  private _buildInvoiceData(arrayData: string[]): CreateInvoiceDto {
    const [
      invoiceId,
      _vendorId,
      invoiceNumber,
      invoiceDate,
      invoiceTotal,
      paymentTotal,
      creditTotal,
      _bankId,
      invoiceDueDate,
      paymentDate,
      currency
    ] = arrayData
    const invoice = new CreateInvoiceDto();
    invoice.id = parseInt(invoiceId);
    invoice.number = invoiceNumber;
    invoice.date = new Date(invoiceDate);
    invoice.total = Math.round(parseFloat(invoiceTotal) * 100);
    invoice.paymentTotal = Math.round(parseFloat(paymentTotal) * 100);
    invoice.creditTotal = Math.round(parseFloat(creditTotal) * 100);
    invoice.dueDate = new Date(invoiceDueDate);
    invoice.paymentDate = paymentDate ? new Date(paymentDate) : null;
    invoice.currency = CURRENCIES[currency];
    validate(invoice)

    return invoice
  }
}