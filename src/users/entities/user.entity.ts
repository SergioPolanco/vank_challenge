import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
} from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity';
import { BankEntity } from 'src/banks/entities/bank.entity';
import { CURRENCIES } from 'src/common/constants/currencies.constants';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public companyName: string;

  @PrimaryColumn()
  public internalCode: number;

  @Column()
  public tributaryId: string;

  @Column()
  public currency: CURRENCIES;

  @Column()
  public apiCalls: number;

  @ManyToMany(() => BankEntity)
  @JoinTable()
  public banks: BankEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.vendor)
  invoices: InvoiceEntity[];
}
