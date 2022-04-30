import { IsNotEmpty, IsString, IsNumber, IsEnum, IsArray } from "class-validator";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly internalCode: number;

  @IsString()
  @IsNotEmpty()
  readonly tributaryId: string;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  readonly currency: CURRENCIES;

  @IsNumber()
  @IsNotEmpty()
  readonly apiCalls: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly banks: number[];
}