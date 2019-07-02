import "reflect-metadata";
import {Action, createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
import {createConnection, getConnectionOptions, QueryRunner, Repository} from 'typeorm';
import * as typeorm from 'typeorm'
import entities from "./app/models/index.entity"
import * as express from "express";
import controllers from "./app/controllers";
import {User} from "./app/models/User";
import {UserEntity} from "./app/models/User/index.entity";

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
    // controllers: [__dirname + "/controllers/*{.js,.ts}"] // register controllers routes in our express app
    controllers: controllers.controllers,

      authorizationChecker: async (action: Action, roles: string[]) => {
        // here you can use request/response objects from action
        // also if decorator defines roles it needs to access the action
        // you can use them to provide granular access check
        // checker must return either boolean (true or false)
        // either promise that resolves a boolean value
        // demo code:
        const uid = action.request.headers["UID"];
        const fname = action.request.headers["firstname"];

        const user = await c.manager.find<UserEntity>(UserEntity, {UID: uid, firstName: fname});
        console.log(user, " : ", uid, " : ", fname)
        if (user)
          return true

        return false;
      }
    })

  expressApp.use(express.static(__dirname + "/public"))


  expressApp.listen(port);

});


console.log(`Server is up and running at port ${port}`);

