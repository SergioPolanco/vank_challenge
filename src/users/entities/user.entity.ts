import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Column, Entity, Index } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public companyName: string;

  @Column()
  public internalCode: string;

  @Column()
  public tributaryId: string;

  @Column()
  public currency: string;

  @Column()
  public apiCalls: number;

  // TODO: join to table bank
  @Column()
  public banks: string;
}