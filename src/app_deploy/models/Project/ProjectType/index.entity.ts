import {Column, Entity, EntityRepository, IsNull, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@EntityRepository()
export class ProjectTypeEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  typeID: number

  @Column()
  programmingLang: string;

  @Column()
  framework: string;

  @Column()
  isValid: boolean;

  @Column()
  description: string;
}