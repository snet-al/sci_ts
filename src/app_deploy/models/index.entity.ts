import {UserEntity} from "./User/index.entity";
import {ProjectTypeEntity} from "./Project/ProjectType/index.entity";
import {ProjectEntity} from "./Project/index.entity";


export default {
  entities: [
    UserEntity,
    ProjectEntity,
    ProjectTypeEntity
  ]
}