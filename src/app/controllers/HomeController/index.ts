import {JsonController, Get, Post, Param, Body, Authorized, Req} from "routing-controllers";
import {Service} from "typedi";
import {User} from "../../models/User";
import {Request} from "express";

@Service()
@JsonController()
export class HomeController {
  constructor(
      public user: User,
  ){}



  @Authorized()
  @Post('/userss')
  postBody(@Req() request: Request): any{
    console.log(request.body);
    return request.body
  }

  @Authorized()
  @Get('/users')
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
  category(@Body() u: any): any {
    return this.user.deploy(u);
  }


}