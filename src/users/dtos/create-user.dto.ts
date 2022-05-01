import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: 'number' })
  banks: number[];
}
