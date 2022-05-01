import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";
import { CURRENCIES } from "src/common/constants/currencies.constants";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly companyName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly internalCode: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly tributaryId: string;

  @IsEnum(CURRENCIES)
  @IsNotEmpty()
  @ApiProperty({
    enum: CURRENCIES,
    description: 'User currency'
  })
  readonly currency: CURRENCIES;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly apiCalls: number;
}