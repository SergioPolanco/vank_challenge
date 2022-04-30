import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";
import { BankEntity } from "src/banks/entities/bank.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto, banks: BankEntity[]): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto,
      banks
    })
    return this._userRepository.save(user)
  }

  async findOne(internalCode: number): Promise<UserEntity> {
    const user = await this._userRepository.findOneOrFail({ where: { internalCode: internalCode } })
    return user;
  }
}