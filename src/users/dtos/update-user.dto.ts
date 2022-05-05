import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CURRENCIES } from 'src/common/constants/currencies.constants';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly tributaryId: string;

  @IsEnum(CURRENCIES)
  @IsOptional()
  @ApiProperty({ enum: CURRENCIES })
  readonly currency: CURRENCIES;
}
