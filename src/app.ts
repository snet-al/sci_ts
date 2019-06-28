import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";
import controllers from './controllers'
import {dbConfig} from "./OptionsDB"
import {Connection, ConnectionManager, ConnectionOptions, createConnection} from 'typeorm';

const c = new ConnectionManager();
// user ormconfig.conf file
export const connection = c.create(dbConfig);
let port: number = 3010;





/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container);

/**
 * We create a new express server instance.
 * We could have also use useExpressServer here to attach controllers to an existing express instance.
 */
const expressApp = createExpressServer({
    /**
     * We can add options about how routing-controllers should configure itself.
     * Here we specify what controllers should be registered in our express server.
     */
    controllers: controllers.controllers
});
/**
 * Start the express app.
 */
expressApp.listen(port);

console.log(`Server is up and running at port ${port}`);

