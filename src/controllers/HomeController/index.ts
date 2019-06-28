import {JsonController, Get, Post, Param, Delete, Body, Put} from "routing-controllers";
import {Service} from "typedi";
import {User} from "../../model/User";
import {Details} from "../../model/User/Details";

@Service()
@JsonController()
export class HomeController {

    constructor(
        protected user: User
    ) {}

    @Get('/')
    home(){
        return 'Hello World'
    }

    @Get("/projects")
    all() {
        return [this.user.getAllDets(), this.user.getDetails()]
    }

    @Get("/info-project/:id")
    one(@Param("id") id: number): Details {
        return this.user.details.projectNo(id)
    }


    @Post("/deploy")
    category(@Body() user: User): User {
        user.deploy();
        return user
    }


    @Delete("/delete-project/:id")
    delete(@Param("id") id: number): any {
        console.log(`Going to delete details for project with id: ${id}`)
        return this.user.delProjectDetails(id)
    }

}