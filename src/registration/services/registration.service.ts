import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/services/user.service";
import { BankService } from "src/banks/services/bank.service";
import { CreateUserDto } from "src/users/dtos/user.dto";
import { RegistrationResponseDto } from "../dtos/registration-response.dto";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly _userService: UserService,
    private readonly _bankService: BankService
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<RegistrationResponseDto> {
    const banks = await this._bankService.findByIds(createUserDto.banks)
    await this._userService.create(createUserDto, banks);
    return { message: 'Success' }
  }
}