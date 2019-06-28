import {Details} from './Details'
import {Container, Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import {createConnection, Repository} from "typeorm";
import {UserEntity} from "./index.entity";
import {connection} from "../../app";
import {UserDetailEntity} from "./Details/index.entity";

@Service()
export class User {

    id: number;
    name: string;
    public projectId: number;
    public lastName: string;
    public firstName: string;
    public UID: number;

    constructor(
        @InjectRepository(UserEntity) public userEntity: Repository<UserEntity>,
        @InjectRepository(UserDetailEntity) public userDetails: Repository<UserDetailEntity>
    ) {}

    getUserWithID(id: number){
        return this.userEntity.findOne(id)
    }


    getAllUserDettails(){

        connection.then(async c => {

            console.log("Loading User Detail from the database...");
            const users = await c.manager.find(UserDetailEntity);
            console.log("Loaded users: ", users);

            console.log("\t\t\t ** Finished  **  \n\t\t ** **  \n");

        }).catch(error => console.log(error));
    }

    registerData(){

        connection.then(async c => {
            console.log("Inserting a new user into the database...");
            const user = new (UserEntity);
            user.firstName = this.firstName;
            user.lastName = this.lastName;
            user.projectId = this.projectId;
            user.UID = this.UID;
            await c.manager.save(user);
            console.log("Saved a new user with id: " + user.id);

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


    getAll() {
        connection.then(async c => {

            console.log("Loading users from the database...");
            const users = await c.manager.find(UserEntity);
            console.log("Loaded users: ", users);

            console.log("\t\t\t ** Finished  **  \n\t\t ** **  \n");

        }).catch(error => console.log(error));
    }
}