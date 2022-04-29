import { Injectable } from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { CreateUserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(
    createUserDto: CreateUserDto,
    queryRunner: QueryRunner
  ): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...createUserDto
    })

    return queryRunner.manager.save(user);
  }
}