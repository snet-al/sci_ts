import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserDetailEntity} from "./index.entity";

@Service()
export class Details {

    constructor(
        @InjectRepository(UserDetailEntity) private userDetail: UserDetailEntity
    ) {}

    private details: Array<any>;

    getAllProjectsDetails(){
        return this.details
    }

    projectNo(id: number) {
        return this.details[id-1]
    }
}