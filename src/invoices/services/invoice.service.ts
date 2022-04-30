import { Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "../dtos/invoice.dto";
import { InvoiceEntity } from "../entities/invoice.entity";
import { BankEntity } from "src/banks/entities/bank.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { InvoiceRepository } from "../repositories/invoice.repository";

@Injectable()
export class InvoiceService {
  constructor(private readonly _invoiceRepository: InvoiceRepository) {}

  async createInvoice(
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
}