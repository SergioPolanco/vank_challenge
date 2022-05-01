import { IsNotEmpty, IsString, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly tributaryId: string;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  @ApiProperty({ enum: CURRENCIES })
  readonly currency: CURRENCIES;
}