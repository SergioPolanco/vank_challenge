import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { UserEntity } from "../entities/user.entity";
import { BankEntity } from "src/banks/entities/bank.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async findOne(internalCode: number): Promise<UserEntity> {
    const user = await this._userRepository.findOneOrFail({ where: { internalCode: internalCode } })
    return user;
  }

  async create(createUserDto: CreateUserDto, banks: BankEntity[]): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto,
      banks
    })
    return this._userRepository.save(user)
  }

  async update(updateUserDto: UpdateUserDto, internalCode: number): Promise<UserEntity> {
    const user = await this._userRepository.createQueryBuilder()
      .update<UserEntity>(UserEntity, {
        tributaryId: updateUserDto.tributaryId,
        currency: updateUserDto.currency
      })
      .where('internalCode = :internalCode', { internalCode })
      .returning(['tributaryId', 'currency'])
      .updateEntity(true)
      .execute();
    return user.raw[0];
  }
}