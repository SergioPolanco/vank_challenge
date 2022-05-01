import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class BankDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
