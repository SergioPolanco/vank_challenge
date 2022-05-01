import { Controller, Param, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UpdateUserResponseDto } from '../dtos/update-user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Partial update user' })
  @ApiOkResponse({ type: UpdateUserResponseDto })
  async partialUpdate(
    @Param('id') internalCode: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UpdateUserResponseDto> {
    const user = await this._userService.update(updateUserDto, internalCode)
    return user
  }
}