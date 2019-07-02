import "reflect-metadata";
import {Action, createExpressServer, useContainer} from "routing-controllers";
import {Container, Service} from "typedi";
import controllers from './app_user/controllers'
import {createConnection, getConnectionOptions, Repository} from "typeorm";
import * as typeorm from "typeorm"
import entities from "./app_user/models/index.entity"
import * as express from "express"
import {User} from "./app_user/models/User";

useContainer(Container);
typeorm.useContainer(Container);

const getType = (envType: any) => {
  switch (envType) {
    case 'mysql':
    case 'mssql':
    case 'postgres':
    case 'mariadb':
    case 'mongodb':
      return envType;
    default:
      return 'mysql';
  }
};

let port = process.env.SERVER_PORT_OAUTH || 3100;



getConnectionOptions();
const connection = createConnection({
  type: getType(process.env.TYPEORM_CONNECTION || 'mysql'),
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number.parseInt(process.env.TYPEORM_PORT || '3306'),
  username: process.env.TYPEORM_USERNAME || "root",
  password: process.env.TYPEORM_PASSWORD || "",
  database: process.env.TYPEORM_DATABASE || "test",
  entities: entities.entities
});


connection.then(c => {

  const expressApp = createExpressServer({
    controllers: controllers.controllers,

  });
  expressApp.use(express.static(__dirname + "/public"));


  expressApp.listen(port);

});


console.log(`Server is up and running at port ${port}`);

