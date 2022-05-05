import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { BankEntity } from 'src/banks/entities/bank.entity';
import { UserRepository } from '../repositories/user.repository';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async findOne(internalCode: number): Promise<UserEntity> {
    const user = await this._userRepository.findOneOrFail({
      where: { internalCode: internalCode },
    });
    return user;
  }

  async create(
    createUserDto: CreateUserDto,
    banks: BankEntity[],
  ): Promise<void> {
    await this._userRepository.insert({
      ...createUserDto,
      banks,
    });
  }

  async update(
    updateUserDto: UpdateUserDto,
    internalCode: number,
  ): Promise<UserEntity> {
    const { tributaryId, currency } = updateUserDto;
    const user = await this._userRepository
      .createQueryBuilder()
      .update<UserEntity>(UserEntity, {
        ...(tributaryId && { tributaryId }),
        ...(currency && { currency }),
      })
      .where('internalCode = :internalCode', { internalCode })
      .returning(['tributaryId', 'currency'])
      .updateEntity(true)
      .execute()
      .then((response) => response.raw[0]);

    if (!user) throw new EntityNotFoundError(UserEntity, internalCode);
    return user;
  }
}
