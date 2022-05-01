import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly tributaryId: string;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  readonly currency: CURRENCIES;
}