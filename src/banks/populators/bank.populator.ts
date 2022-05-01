import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { BankService } from "src/banks/services/bank.service";
import { BANKS } from "../data/bank.data";

@Injectable()
export class BankPopulator implements OnApplicationBootstrap {
  private readonly logger = new Logger(BankPopulator.name);
  constructor(
    private readonly _bankService: BankService,
  ) {}
  
  async onApplicationBootstrap(): Promise<void> {
    await this.insertBanks()
  }

  async insertBanks(): Promise<void>{
    for (const bank of BANKS) {
      try {
        await this._bankService.create(bank)
      } catch (error) {
        this.logger.log(`Error saving bank: ${bank.name}`, error)
      }
    }
  }
}