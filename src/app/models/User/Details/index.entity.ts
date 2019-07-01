import {Column, Entity, EntityRepository, IsNull, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@EntityRepository()
export class UserDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  projectID: string;

  @Column()
  projectDetails: string;

}