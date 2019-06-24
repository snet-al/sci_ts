import {User} from "../index";
import {Service} from "typedi";

@Service()
export class Details {

    private details: Array<any>;
    constructor (opt?: any) {
        this.details = [{
            name: "name",
            id: "id",
            description: "description"
        }, {
            name: "name stuff",
            id: "id blank",
            description: "description stuff"
        }, {
            name: "name other",
            id: "id stuff",
            description: "description IDK"
        }]

    }



    getAllProjectsDetails(){
        return this.details
    }

    projectNo(id: number) {
        return this.details[id-1]
    }
}