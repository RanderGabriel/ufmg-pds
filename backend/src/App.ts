import express = require('express');
import Middlewares from './middlewares';
import Controllers from './controllers';

class App {
    
    public app: express.Express;

    constructor(port: number) {
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
        console.log(`rodando na porta ${port}`)
        return this.app.listen(port);
    }

}

const application = new App(5000);

export default application;