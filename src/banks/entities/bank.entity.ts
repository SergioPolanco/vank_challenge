import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { InvoiceEntity } from 'src/invoices/entities/invoice.entity';

@Entity({ name: 'banks' })
export class BankEntity extends AbstractEntity {
  @PrimaryColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.id)
  invoices: InvoiceEntity[];
}
