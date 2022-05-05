import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { BankService } from '../services/bank.service';
import { BankDto } from '../dtos/bank.dto';

@ApiTags('Banks')
@Controller('banks')
export class BankController {
  constructor(private readonly _bankService: BankService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch banks' })
  @ApiOkResponse({ type: BankDto, isArray: true })
  async find(): Promise<BankDto[]> {
    const banks = await this._bankService.find();
    return banks;
  }
}
