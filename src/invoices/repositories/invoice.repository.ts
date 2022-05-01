import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { InvoiceEntity } from '../entities/invoice.entity';

@EntityRepository(InvoiceEntity)
export class InvoiceRepository extends Repository<InvoiceEntity> {}
