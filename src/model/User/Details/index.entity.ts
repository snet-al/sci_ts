import {Column, Entity, EntityRepository, IsNull, PrimaryGeneratedColumn} from "typeorm";

@Entity("sci_details")
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