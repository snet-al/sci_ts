import {Details} from './Details'
import {Service} from "typedi";
import {exec} from "child_process";


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

    deploy(){
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