import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseDto {
  @ApiProperty()
  public message: string;
}