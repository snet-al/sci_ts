import {Column, CreateDateColumn, Entity, EntityRepository, Index, PrimaryGeneratedColumn, Table} from "typeorm";

@Entity()
@EntityRepository()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true, nullable: false })
  projectId: number;

  @Column()
  projectName: string;

  @Column()
  userUID: number;

  @Column()
  running: boolean;

  @Column()
  projectTypeId: number;

  @Column()
  projectRepository: string;

  @Column()
  branch: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createdAt: Date;


}