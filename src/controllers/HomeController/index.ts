import {JsonController, Get, Post, Param, Body} from "routing-controllers";
import {Service} from "typedi";
import {User, UserDto} from "../../model/User";
@Service()
@JsonController()
export class HomeController {

    constructor(
       public user: User,
    ){}

    @Get('/')
    getAll(): any{
        return this.user.getAll()
    }

    @Get("/projects")
    all(): any {
        return this.user.getAllUserDetails()
    }

    @Get("/info-project/:id")
    one(@Param("id") id: number): any {
        return this.user.getUserWithID(id)
    }


    @Post("/deploy")
    category(@Body() u: any): any {
        return this.user.deploy(u);

    }


}