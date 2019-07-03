import {JsonController, Get, Post, Param, Body, Authorized, Req, CurrentUser} from "routing-controllers";
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
  postBody(@CurrentUser({required: true}) u: User, @Req() request: Request): any{
    console.log(request.body);
    return request.body
  }

  @Authorized()
  @Get('/users')
  getAll(@CurrentUser({required: true}) u: User): any{
    console.log(u.firstName + " : " + u.lastName);
    return this.user.getAll()
  }

  @Authorized()
  @Get("/projects")
  all(@CurrentUser({required: true}) u: User): any {
    return this.user.getAllUserDetails()
  }

  @Authorized()
  @Get("/info-user/:id")
  one(@CurrentUser({required: true}) u: User, @Param("id") id: number): any {
    return this.user.getUserWithID(id)
  }


 @Authorized()
  @Post("/saveNewUser")
  category(@CurrentUser({required: true}) u: User, @Body() user: any): any {
    return this.user.deploy(user);
  }


}