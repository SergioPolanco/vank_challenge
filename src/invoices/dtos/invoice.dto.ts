import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/users/dtos/user.dto";
import { BankDto } from "src/banks/dtos/bank.dto";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class InvoiceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNumber()
  @ApiProperty({ type: UserDto })
  vendor: UserDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  paymentTotal: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  creditTotal: number;

  @IsNumber()
  @ApiProperty()
  bank: BankDto;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  dueDate: Date;

  @IsDate()
  @ApiProperty()
  paymentDate: Date;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  @ApiProperty({ enum: CURRENCIES })
  currency: CURRENCIES;
}
