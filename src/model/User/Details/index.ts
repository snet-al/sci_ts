import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserDetailEntity} from "./index.entity";
import {Repository} from "typeorm";

@Service()
export class Details {

    constructor(
        @InjectRepository(UserDetailEntity) public userDetails: Repository<UserDetailEntity>
    ) {}


    findAll() {
        this.userDetails.find()
    }
}