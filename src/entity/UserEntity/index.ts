import {Column, Entity, IsNull, PrimaryGeneratedColumn} from "typeorm";
import {Details} from "../../model/User/Details";

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