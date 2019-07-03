import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {ProjectTypeEntity} from "./index.entity";
import {Column, PrimaryGeneratedColumn, Repository} from "typeorm";

@Service()
export class ProjectType {

  public programmingLang: string;
  public framework: string;
  public typeID: number;
  public isValid: boolean;

  @Column()
  description: string;
  constructor(
      @InjectRepository(ProjectTypeEntity) public projectTypeEntityRepository: Repository<ProjectTypeEntity>
  ) {}


  getAllTypes(){
   return this.projectTypeEntityRepository.find()
  }

  testValidity():boolean{
    //testing stuff
    return true
  }

  createNewProjectType(pType: ProjectType){
    pType.isValid = this.testValidity();
    return this.projectTypeEntityRepository.save(pType)
  }

  getProjectTypeBy(id: number):any{
      return this.projectTypeEntityRepository.find({typeID: id})
  }

}