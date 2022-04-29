import { IsNotEmpty, IsString, IsNumber, IsArray } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly companyName: string;

  @IsString()
  @IsNotEmpty()
  readonly internalCode: string;

  @IsString()
  @IsNotEmpty()
  readonly tributaryId: string;

  @IsString()
  @IsNotEmpty()
  readonly currency: string;

  @IsNumber()
  @IsNotEmpty()
  readonly apiCalls: number;

  // @IsArray()
  // @IsString({ each: true })
  @IsString()
  @IsNotEmpty()
  readonly banks: string;

}