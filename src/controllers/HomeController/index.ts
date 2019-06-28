import {JsonController, Get, Post, Param, Body} from "routing-controllers";
import {Service} from "typedi";
import {User} from "../../model/User";
import {InjectRepository} from "typeorm-typedi-extensions";

@Service()
@JsonController()
export class HomeController {

    constructor(
        @InjectRepository(User) public user: User,
    ){}

    @Get('/')
    getAll(){
        return this.user.getAll()
    }

    @Get("/projects")
    all() {
        return this.user.getAllUserDettails()
    }

    @Get("/info-project/:id")
    one(@Param("id") id: number): any {
        return this.user.getUserWithID(id)
    }


    @Post("/deploy")
    category(@Body() user: User): User {
        user.deploy();
        return user
    }


}