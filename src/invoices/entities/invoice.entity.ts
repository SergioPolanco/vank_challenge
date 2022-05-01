import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { BankEntity } from 'src/banks/entities/bank.entity';
import { CURRENCIES } from 'src/common/constants/currencies.constants';

@Entity({ name: 'invoices' })
export class InvoiceEntity extends AbstractEntity {
  @PrimaryColumn()
  public id: number;

  @ManyToOne(() => UserEntity, (user) => user.invoices, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'vendor_id' })
  public vendor: UserEntity;

  @Column()
  public number: string;

  @Column()
  public date: Date;

  @Column({ type: 'integer' })
  public total: number;

  @Column({ type: 'integer' })
  public paymentTotal: number;

  @Column({ type: 'integer' })
  public creditTotal: number;

  @ManyToOne(() => BankEntity, (bank) => bank.invoices, { nullable: false })
  @JoinColumn({ name: 'bank_id' })
  public bank: BankEntity;

  @Column()
  public dueDate: Date;

  @Column({ nullable: true })
  public paymentDate: Date;

  @Column()
  public currency: CURRENCIES;
}
