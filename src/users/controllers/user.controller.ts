import { Controller, Param, Body, Patch, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserResponseDto } from '../dtos/update-user-response.dto';
import { UserDto } from '../dtos/user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiOkResponse({ type: UserDto })
  async findOne(
    @Param('id') internalCode: number,
  ): Promise<UpdateUserResponseDto> {
    const user = await this._userService.findOne(internalCode);
    return user;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partial update user' })
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async partialUpdate(
    @Param('id') internalCode: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this._userService.update(updateUserDto, internalCode);
    return user;
  }
}
