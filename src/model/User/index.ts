import {Details} from './Details'
import {Service} from "typedi";
import {exec} from "child_process";
import {UserEntity} from "../../entity/UserEntity";
import {createConnection} from "typeorm";
import {EUser} from "../../entity/eUser"


@Service()
export class User {

    id: number;
    name: string;
    private projectId: number;
    private lastName: string;
    private firstName: string;
    private UID: number;

    constructor(UID: number, FirstName: string, LastName: string, public details: Details, ProjectId: number) {
        this.UID = UID;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.projectId = ProjectId
    }

    getDetails(){
        return {
            ProjectId: this.projectId,
            ProjectDetails: this.details.projectNo(this.projectId)
        }
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
        createConnection().then(async connection => {

            console.log("Inserting a new user into the database...");
            const user = new (EUser);
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.age = this.projectId;
            //user.UID = this.UID;

            await connection.manager.save(user);
            console.log("Saved a new user with id: " + user.id);

            console.log("Loading users from the database...");
            const users = await connection.manager.find(EUser);
            console.log("Loaded users: ", users);

            console.log("Here you can setup and run express/koa/any other framework.");

        }).catch(error => console.log(error));


    }

    deploy(){
        this.registerData()
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