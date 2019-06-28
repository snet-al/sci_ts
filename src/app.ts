import "reflect-metadata";
import {createExpressServer, useContainer} from "routing-controllers";
import {Container} from "typedi";
import controllers from './controllers'
import {createConnection} from 'typeorm';
let typeorm = require('typeorm');

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

const connection = createConnection({
    type: getType(process.env.TYPEORM_CONNECTION || 'mysql'),
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number.parseInt(process.env.TYPEORM_PORT || '3306'),
    username: process.env.TYPEORM_USERNAME ||  "admin",
    password: process.env.TYPEORM_PASSWORD || "admin",
    database: process.env.TYPEORM_DATABASE ||  "ecm"
});
let port: number = 3010;

const expressApp = createExpressServer({
    controllers: controllers.controllers
});

expressApp.listen(port);

console.log(`Server is up and running at port ${port}`);

