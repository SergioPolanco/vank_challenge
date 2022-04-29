import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/services/user.service";
import { Connection, QueryRunner } from "typeorm";
import { CreateUserDto } from "src/users/dtos/user.dto";
import { RegistrationResponseDto } from "../dtos/registration-response.dto";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly _userService: UserService,
    private readonly _connection: Connection
  ) {}

  async registration(createUserDto: CreateUserDto): Promise<RegistrationResponseDto> {
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this._userService.createUser(createUserDto, queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return { message: 'Success' }
  }
}