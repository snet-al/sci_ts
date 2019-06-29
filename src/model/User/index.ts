import {Details} from './Details'
import { Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import { Repository} from "typeorm";
import {UserEntity} from "./index.entity";

@Service()
export class User {

    constructor(
        @InjectRepository(UserEntity) public userEntity: Repository<UserEntity>, public detail : Details
    ) {}

    getUserWithID(id: number){
        return this.userEntity.findOne(id)
    }


    getAllUserDettails(){
        return this.detail.userDetails.find()
    }

    registerData(){
        return this.userEntity.create()


    }

    deploy(){
        this.registerData();
        exec(`./shellScripts/shellScriptProject_No${1}.sh`, (err, stdout, stderr) => {
            // your callback
            console.log(`\t\t******** ************* \t EXECUTED   **************** ******** \n 
            \n \t \t \t \t ******** OUTPUT ************ \n \n ${stdout}`);
            if (err) {
                console.log(`ProjectId == ${1} \t does not EXIST... \n\n \t\t ********* LOGGED ERROR ******** \n ${err}`)
            }
        });

    }


    getAll() {
       return this.userEntity.find()
    }
}