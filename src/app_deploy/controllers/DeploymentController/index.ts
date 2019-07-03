import {JsonController, Get, Post, Param, Body, Authorized, Req, CurrentUser} from "routing-controllers";
import {Service} from "typedi";
import {Project} from "../../models/Project";
import {User} from "../../models/User";

@Service()
@JsonController()
export class DeploymentController {
  constructor(
      public project: Project,
  ){}

  @Authorized()
  @Get("/projects")
  getProjects(@CurrentUser() u: User){
    this.project.userUID = u.UID;
    return this.project.getAllProjects()
  }

  @Authorized()
  @Get("/projects")
  getProjectType(@CurrentUser() u: User){
    this.project.userUID = u.UID;
    console.log(`GET: projects/ \n USER: ${u}`);
    return this.project.getAllProjectTypes()
  }

  @Authorized()
  @Get("/project/:id")
  getProjectById(@CurrentUser() u: User,  @Param("id") id: number){
    console.log(`GET: project/:id \n USER: ${u}`);
    return this.project.getProjectById(id)
  }

  @Authorized()
  @Get("/status/:id")
  getProjectStatusWithId(@CurrentUser() u: User,  @Param("id") id: number){
    console.log(`GET: status/:id \n USER: ${u}`);
    return this.project.checkStatus(id)
  }

  @Authorized()
  @Get("/run/:id")
  runProjectWithId(@CurrentUser() u: User,  @Param("id") id: number){
    console.log(`GET: run/:id \n USER: ${u}`);
    return this.project.run(id)
  }

  @Authorized()
  @Get("/stop/:id")
  stopProjectWithId(@CurrentUser() u: User,  @Param("id") id: number){
    console.log(`GET: stop/:id \n USER: ${u}`);
    return this.project.stop(id)
  }

  @Authorized()
  @Post("/create-new-project")
  createNewProject(@CurrentUser() u: User, @Body() project: Project){
    project.userUID = u.UID;
    console.log(`POST: /create-new-project USER: ${u}`);
    return this.project.createNewProject(project);
  }

  @Authorized()
  @Post("/create-new-project-type")
  createNewProjectType(@CurrentUser() u: User, @Body() project: any){
    console.log(`POST: /create-new-project-type USER: ${u}`);
    return this.project.createNewProjectType(project);
  }



}