import express = require('express');
import Middlewares from './middlewares';
import Controllers from './controllers';
import { createConnection } from 'typeorm';
import * as http from 'http';
import socketIO = require('socket.io');
import WebsocketService from './services/WebsocketService';
import { profileService } from './services';

class App {
    
    public app: express.Express;
    private server: http.Server;
    private io: socketIO.Server;

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

    private configureSocket() {
        this.app.get('/websocket', (req: express.Request, res: express.Response) => {
            const message = String(req.query.message);
            this.io.emit('globalAlert', message);
        });

        WebsocketService.initIo(this.io);
        
        this.io.on('connection', (socket) => {
            console.log(`Connected: ${socket.id}`);
            socket.on("createRequest", (args) => {
                this.io.emit("requestCreated", {
                    id: args.id
                })
            })
        });
    }

    async checkProfiles() {
        const profiles = await profileService.getAll();
        if(!profiles || profiles.length <= 0) {
            console.warn(`
            NENHUM PERFIL ENCONTRADO!!
            Sem os perfis, o cadastro não funciona corretamente

            Você se esqueceu de rodar o 'npm run migrate'?
            `);
        }
    }

    public start(port: number = 5000) {
        this.server = this.app.listen(5000);
        this.io = socketIO.listen(this.server);
        this.configureSocket();
        this.checkProfiles();
    } 

}

export class AppTest extends App {
    constructor() {
        super()
    }

    async setupTest() {
        return new Promise((resolve, reject) => {
            createConnection("test-connection").then((_) => {
                resolve()
            }).catch(error => {
                reject()
            })
        })
    }
}

const application = new App();
export default application;
