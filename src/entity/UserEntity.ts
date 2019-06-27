import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectId: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    UID: number;
}