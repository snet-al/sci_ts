import {JsonController, Get, Post, Param, Body, Authorized, Action} from "routing-controllers";
import {Service} from "typedi";
import {User} from "../../models/User";



@Service()
@JsonController()
export class HomeController {
  constructor(
      public user: User,
  ){}


  @Authorized()
  @Get('/all')
  getAll(): any{
    return this.user.getAll()
  }

  @Authorized()
  @Get("/projects")
  all(): any {
    return this.user.getAllUserDetails()
  }

  @Authorized()
  @Get("/info-user/:id")
  one(@Param("id") id: number): any {
    return this.user.getUserWithID(id)
  }

  @Authorized()
  @Post("/deploy")
  dep(@Body() u: any): any {
    return this.user.deploy(u);
  }


}