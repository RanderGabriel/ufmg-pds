import { Express } from 'express';
import express = require('express');
import middlewares from './middlewares';

class App {
    
    private app: Express;

    constructor() {
        this.app = express();

        this.useMiddlewares(middlewares);
        this.start(5000);
    }

    public static main() {
        const app = new App();
    }

    private useMiddlewares(middlewares: express.Router) {
        this.app.use(middlewares);
    }

    private start(port: number = 5000) {
        this.app.listen(port, () => {
            console.log(`Servidor funcionando na porta :${port}`);
        });
    }

}

App.main();