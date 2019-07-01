import "reflect-metadata";
import {Action, createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
import controllers from './app_user/controllers'
import {createConnection, getConnectionOptions} from "typeorm";

let typeorm = require('typeorm');
import entities from "./app_user/models/index.entity"
import * as express from "express"

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

connection.then(() => {

  const expressApp = createExpressServer({
    controllers: controllers.controllers,
    authorizationChecker: async (action: Action, roles?: string[]) => {

      // perform queries based on token from request headers
      const token = action.request.headers["authorization"];
      // return database.findUserByToken(token).roles.in(roles);
      console.log(token);
      return token
    }
  });
  expressApp.use(express.static(__dirname + "/public"));


  expressApp.listen(port);

});


console.log(`Server is up and running at port ${port}`);

