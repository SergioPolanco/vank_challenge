import { IsNotEmpty, IsString, IsNumber, IsEnum, IsDate } from "class-validator";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class CreateInvoiceDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  vendor: number;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  paymentTotal: number;

  @IsNumber()
  @IsNotEmpty()
  creditTotal: number;

  @IsNumber()
  bankId: number;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @IsDate()
  paymentDate: Date;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  currency: CURRENCIES;
}
