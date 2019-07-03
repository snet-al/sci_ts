import {Column, Entity, EntityRepository, PrimaryGeneratedColumn, Table} from "typeorm";

@Entity()
@EntityRepository()
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public projectId: number;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  UID: number;
}