import "reflect-metadata";
import {Action, createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
import {createConnection, getConnectionOptions} from 'typeorm';
import * as typeorm from 'typeorm'
import entities from "./app/models/index.entity"
import * as express from "express";
import controllers from "./app/controllers";
import {User} from "./app/models/User";

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

let port = process.env.SERVER_PORT || 3000;


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
    let  expressApp = createExpressServer({
    controllers: controllers.controllers,




      authorizationChecker: async (action: Action, roles: string[])=> {
        const uid = action.request.headers["authorization"];
        console.log(uid);
        if (await Container.get(User).userEntity.findOne({UID: +uid}) != null) {
          console.log("authorizated user");
          return true
        } else {
          console.log("\nnot authorizated user\n\n\n");
          return false
        }
      },


      currentUserChecker: async (action: Action) => {
        const uid = action.request.headers["authorization"];
        console.log(uid);
      return await Container.get(User).userEntity.findOne({UID:+uid})

      }

    });

  expressApp.use(express.static(__dirname + "/public"));


  expressApp.listen(port);

});


console.log(`Server is up and running at port ${port}`);

