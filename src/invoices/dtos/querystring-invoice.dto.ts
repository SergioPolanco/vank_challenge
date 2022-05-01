import {IsNumberString, IsDateString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class QueryStringInvoiceDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty()
  vendor: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2000-01-01T03:00:00.000Z' })
  from: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ example: '2000-01-01T03:00:00.000Z' })
  to: Date;

  @IsOptional()
  @IsEnum(CURRENCIES)
  @ApiProperty({ enum: CURRENCIES })
  currency: CURRENCIES;
}
