import { Controller, Param, Body, Patch } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Patch(':id')
  async partialUpdate(
    @Param('id') internalCode: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    const user = await this._userService.update(updateUserDto, internalCode)
    return user
  }
}