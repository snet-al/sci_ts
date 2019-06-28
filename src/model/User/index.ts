import {Details} from './Details'
import {Container, Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import {createConnection} from "typeorm";
import {UserEntity} from "../../entity/UserEntity";
// import {connection} from "../../app";
import {useContainer} from "routing-controllers";

@Service()
export class User {

    id: number;
    name: string;
    public projectId: number;
    public lastName: string;
    public firstName: string;
    public UID: number;

    constructor(
    @InjectRepository(UserEntity) public u: UserEntity,
    @InjectRepository(Details) public details: Details){
    }

    getDetails(){

        //
        // const users = connection.manager.find(UserEntity);
        // console.log("Loaded users: ", users);
        // return  users;

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


        console.log("Inserting a new user into the database...");
           /* const user = new (UserEntity);
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.projectId = this.projectId;
            user.UID = this.UID;
            connection.manager.save(user);
            console.log("Saved a new user with id: " + user.id);

            console.log("Loading users from the database...");
            const users = connection.manager.find(UserEntity);
            console.log("Loaded users: ", users);

            console.log("\t\t\t ** Finished  **  \n\t\t ** Closing Connection **  \n");
*/


        createConnection().then(async connection => {

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