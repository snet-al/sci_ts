
import { Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import { Repository} from "typeorm";
import {UserEntity} from "./index.entity";



@Service()
export class User {

  public firstName: string;
  public lastName: string;
  public UID: number;
  constructor(
      @InjectRepository(UserEntity)
      public userEntity: Repository<UserEntity>,
  ) {}



  getUserWithID(id: number){
    return this.userEntity.find({UID: id})

  }

  getAllUserDetails(){
    return {
      firstName: this.firstName,
      lastNAme: this.lastName,
      UID: this.UID,
    }
  }
  getAll() {
    return this.userEntity.find()
  }

  saveNewUser(u: User){

    return this.userEntity.save(u)

  }
/*
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
*/
}