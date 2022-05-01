import { Injectable } from "@nestjs/common";
import { CreateBankDto } from "../dtos/create-bank.dto";
import { BankEntity } from "../entities/bank.entity";
import { BankRepository } from "../repositories/bank.repository";

@Injectable()
export class BankService {
  constructor(private readonly _bankRepository: BankRepository) {}

  async create(createBankDto: CreateBankDto): Promise<BankEntity> {
    const bank = this._bankRepository.create({ ...createBankDto })
    return this._bankRepository.save(bank)
  }

  async findByIds(bankIds: number[]): Promise<BankEntity[]> {
    const banks = await this._bankRepository.findByIds(bankIds)
    return banks;
  }

  async findById(bankId: number): Promise<BankEntity> {
    const bank = await this._bankRepository.findOneOrFail({ where: { id: bankId } })
    return bank
  }
}