import {Details} from './Details'
import {Container, Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import {createConnection, Repository} from "typeorm";
import {UserEntity} from "./index.entity";
import {connection} from "../../app";

@Service()
export class User {

    id: number;
    name: string;
    public projectId: number;
    public lastName: string;
    public firstName: string;
    public UID: number;

    constructor(
        @InjectRepository(UserEntity) public userEntity: Repository<UserEntity>, public details: Details
    ) {}

    getDetails(){

        return {failed: true}
    }

    delProjectDetails(projectId: number){
        let deletedProjectDetails: any;
       let d = this.details.getAllProjectsDetails();
       deletedProjectDetails = d.splice(this.id,1);
        return deletedProjectDetails
    }


    getAllDets(){
        return this.details.getAllProjectsDetails()
    }

    registerData(){

        connection.then(async connection => {
            console.log("Inserting a new user into the database...");
            const user = new (UserEntity);
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.projectId = this.projectId;
            user.UID = this.UID;
            await connection.manager.save(user);
            console.log("Saved a new user with id: " + user.id);

            console.log("Loading users from the database...");
            const users = await connection.manager.find(UserEntity);
            console.log("Loaded users: ", users);

            console.log("\t\t\t ** Finished  **  \n\t\t ** Closing Connection **  \n");
            connection.close()

        }).catch(error => console.log(error));


    }

    deploy(){
        this.registerData();
        exec(`./shellScripts/shellScriptProject_No${this.projectId}.sh`, (err, stdout, stderr) => {
            // your callback
            console.log(`\t\t******** ************* \t EXECUTED   **************** ******** \n 
            \n \t \t \t \t ******** OUTPUT ************ \n \n ${stdout}`);
            if (err) {
                console.log(`ProjectId == ${this.projectId} \t does not EXIST... \n\n \t\t ********* LOGGED ERROR ******** \n ${err}`)
            }
        });

    }



}