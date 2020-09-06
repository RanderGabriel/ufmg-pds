import express = require('express');
import Middlewares from './middlewares';
import Controllers from './controllers';
import {createConnection} from 'typeorm'
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
        console.log(`rodando na porta ${port}`)
        return this.app.listen(port);
    }

}

export class AppTest extends App {
    constructor(){
        super()
    }

    async setupTest() {
        return new Promise((resolve, reject) => {
            createConnection().then((_) => {
                resolve()
            }).catch(error => {
                reject()
            })
        })
    }
}


const application = new App();
export default application;
