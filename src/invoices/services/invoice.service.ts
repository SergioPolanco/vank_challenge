import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { Between } from "typeorm";
import { CreateInvoiceDto } from "../dtos/invoice.dto";
import { QueryStringInvoiceDto } from "../dtos/querystring-invoice.dto";
import { InvoiceExternalService } from "./invoice-external.service";
import { InvoiceEntity } from "../entities/invoice.entity";
import { BankEntity } from "src/banks/entities/bank.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { InvoiceRepository } from "../repositories/invoice.repository";
import { CURRENCIES } from "src/common/constants/currencies.constants";

@Injectable()
export class InvoiceService {
  constructor(
    private readonly _invoiceRepository: InvoiceRepository,
    private readonly _invoiceExternalService: InvoiceExternalService
  ) {}

  async find(queryStringInvoiceDto: QueryStringInvoiceDto): Promise<InvoiceEntity[]> {
    const { vendor, from, to, currency } = queryStringInvoiceDto;
    const queryStringHaveDate = from && to;
    const invoices = await this._invoiceRepository.find({
      where: {
        ...(vendor) && { vendor: parseInt(vendor) },
        ...(queryStringHaveDate) && {
          date: Between(from, to)
        }
      }
    })

    const invoicesNormalized = await this._normalizeCurrencies(invoices, currency)
    return invoicesNormalized;
  }

  async create(
    createInvoiceDto: CreateInvoiceDto,
    user: UserEntity,
    bank: BankEntity
  ): Promise<InvoiceEntity> {
    const invoice = this._invoiceRepository. create({
      ...createInvoiceDto,
      bank: bank,
      vendor: user
    })
    return  this._invoiceRepository.save(invoice)
  }

  private async _normalizeCurrencies(invoices: InvoiceEntity[], qsCurrency: string = null): Promise<InvoiceEntity[]> {
    const _invoices = [...invoices]
    for (const invoice of _invoices) {
      const {
        total,
        creditTotal,
        paymentTotal,
        currency,
        vendor: { currency: vendorCurrency }
      } = invoice;
      const currencyToUse = qsCurrency || currency
      const newTotal = await this._convertCurrency(currencyToUse, vendorCurrency, total);
      const newPaymentTotal = await this._convertCurrency(currencyToUse, vendorCurrency, paymentTotal);
      const newCreditTotal = await this._convertCurrency(currencyToUse, vendorCurrency, creditTotal);

      invoice.total = newTotal;
      invoice.creditTotal = newCreditTotal;
      invoice.paymentTotal = newPaymentTotal;
    }

    return _invoices;
  }

  private async _convertCurrency(from: string, to: string, value: number) {
    if (from === to) return this._correncyToDecimal(value)

    const typeKey = `${from}_${to}`
    let currencyValue: number
    try {
      const response = await lastValueFrom(
        this._invoiceExternalService.convertCurrency<{[typeKey: string]: number}>(from, to)
      )
      currencyValue = response[typeKey]
    } catch (error) {
      return this._correncyToDecimal(value)
    }

    return this._correncyToDecimal(value) * currencyValue
  }

  private _correncyToDecimal(value: number): number {
    return value / 100
  }
}