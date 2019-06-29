import {Details} from './Details'
import { Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import { Repository} from "typeorm";
import {UserEntity} from "./index.entity";

export class UserDto{
    public firstName: string;
    public lastName: string;
    public UID: number;
    public projectId: number;

}


@Service()
export class User {
    public fields : UserDto ;
    public detail : Details;

    constructor(
                @InjectRepository(UserEntity)
                public userEntity: Repository<UserEntity>
    ) {}

    getUserWithID(id: number){
        return this.userEntity.findOne(id)
    }


    getAllUserDetails(){
        return this.detail.userDetails.find()
    }


    deploy(u: UserDto){
        this.exec(u.projectId);
        return this.userEntity.save(u)

    }
    exec(pID: number){
        exec(`./shellScripts/shellScriptProject_No${pID}.sh`,
            (err, stdout, stderr) => {
            // your callback
            console.log(`\t\t******** ************* \t 
            EXECUTED   **************** ******** \n
            \n \t \t \t \t ******** OUTPUT 
            ************ \n \n ${stdout}`);
            if (err) {
                console.log(`ProjectId == ${pID} \t
                 does not EXIST... \n\n \t\t ********* 
                 LOGGED ERROR ******** \n ${err}`)
            }
        });
    }


    getAll() {
       return this.userEntity.find()
    }
}