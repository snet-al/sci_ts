import "reflect-metadata";
import {createExpressServer, useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";
import {HomeController} from "./controllers/HomeController";
let port: number = 3000;

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
    controllers: [
        HomeController
    ]
});

/**
 * Start the express app.
 */
expressApp.listen(port);

console.log(`Server is up and running at port ${port}`);