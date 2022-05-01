import {IsNumberString, IsDateString, IsOptional, IsEnum } from "class-validator";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class QueryStringInvoiceDto {
  @IsOptional()
  @IsNumberString()
  vendor: string;

  @IsOptional()
  @IsDateString()
  from: Date;

  @IsOptional()
  @IsDateString()
  to: Date;

  @IsOptional()
  @IsEnum(CURRENCIES)
  currency: CURRENCIES;
}
