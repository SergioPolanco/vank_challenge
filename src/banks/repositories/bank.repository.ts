import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { BankEntity } from '../entities/bank.entity';

@EntityRepository(BankEntity)
export class BankRepository extends Repository<BankEntity> {}
