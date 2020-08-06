import express = require('express');
import Middlewares from './middlewares';
import Controllers from './controllers';

class App {
    
    public app: express.Express;

    constructor() {
        this.app = express();
        this.useMiddlewares(Middlewares);
        this.useControllers(Controllers);
    }

    private useMiddlewares(middlewares: express.Router) {
        this.app.use(middlewares);
    }

    private useControllers(controllers: express.Router) {
        this.app.use(controllers);
    }

    public start(port: number = 5000) {
        this.app.listen(port);
        console.log(`App running at :${port}`);
    }

}

const application = new App();

export default application;