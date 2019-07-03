import {ProjectType} from './ProjectType'
import { Service} from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import {exec} from "child_process";
import {Column, Repository} from "typeorm";
import {ProjectEntity} from "./index.entity";
import {Container} from "typedi";

@Service()
export class Project {

  projectId: number;
  running: boolean;
  userUID: number;
  projectName: string;
  projectTypeID: number;
  projectRepository: string;
  branch: string;
  details: string;
  public pType: ProjectType = Container.get(ProjectType);

  constructor(
      @InjectRepository(ProjectEntity)
      public projectEntity: Repository<ProjectEntity>,
  ) {}


  lastUsage() {
    return this.projectEntity.update(
        {
      projectId : this.projectId,
      running : this.running,
      projectName : this.projectName,
      projectTypeId : this.projectTypeID,
      projectRepository : this.projectRepository,
      branch :this.branch,
      details:  `Project Updated by User with UID: ${this.userUID} at: ${Date.now()}`
    },
        {
      projectId : this.projectId,
      running : this.running,
      projectName : this.projectName,
      projectTypeId : this.projectTypeID,
      projectRepository : this.projectRepository,
      branch :this.branch,
      details:  `Project Updated by User with UID: ${this.userUID} at: ${Date.now()}`
    }
    )
  }

  getAllProjects(){
    return this.projectEntity.find(), this.lastUsage()
  }

  stop(projectID: number){
    // TODO: Stop the project from running
    if (!this.running)
      return ;
    return this.running = false;
  }

  checkStatus(projectID: number) {
    // TODO: Check if the app is Running or not.
    if (1 == 1)
      return this.running = true;
    return this.running = false;
  }

  run(projectID: number){
    // TODO: Run the program
    if (this.running)
      return;
    return this.running = true

  }

  createNewProjectType(pType: ProjectType){
    return this.pType.createNewProjectType(pType)
  }

  getAllProjectTypes() {
    return this.pType.getAllTypes()
  }


  getProjectById(id: number){
    return this.projectEntity.find({projectId: id})
  }

  createNewProject(project: Project){
    let t: ProjectType = this.pType.getProjectTypeBy(project.projectTypeID);
    if (t.isValid) {
      return this.projectEntity.save(project)
    } else {
      return {status: "Cannot Save project", cause: "Invalid Project Type"}
    }
  }



  exec(ProjectID: number){
    exec(`./shellScripts/shellScriptProject_No${ProjectID}.sh`,
        (err, stdout, stderr) => {

          console.log(
                 `\t\t******** ************* \t  EXECUTED
                 **************** ******** \n\n \t \t \t \t 
                 ******** OUTPUT  ************ 
                 \n \n ${stdout}`);

          if (err) {
            console.log(
                 `ProjectId == ${ProjectID} \t
                 does not EXIST... \n\n \t\t 
                 *********  LOGGED ERROR ******** 
                 \n ${err}`)
          }
        });
  }
}