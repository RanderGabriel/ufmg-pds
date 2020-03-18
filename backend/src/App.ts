import { Express } from 'express';
import express = require('express');
import middlewares from './middlewares';
import "reflect-metadata";
import { createConnection } from "typeorm";
import {Profile} from './entity/Profile';
import { Server } from 'http';


class App {
    
    public app: Express;
    public server: Server;
    constructor() {
        this.initDb();
        this.app = express();
        this.useMiddlewares(middlewares);
        this.server = this.app.listen(5000, () => {
            //console.log(`Servidor funcionando na porta :${port}`);
        });
    }

    private useMiddlewares(middlewares: express.Router) {
        this.app.use(middlewares);
    }

    private initDb(){
        createConnection().then(async connection => {
            let profileRepository = connection.getRepository(Profile);
            let [profiles, profileCount] = await profileRepository.findAndCount();

            if(profileCount === 0){
                let profileMechanic =  new Profile();
                profileMechanic.name = 'MECHANIC';

                let profileDriver =  new Profile();
                profileDriver.name = 'DRIVER';


                await profileRepository.save(profileMechanic);
                await profileRepository.save(profileDriver);
            }
            connection.close();
        }).catch(err => console.log(err))
    }

    public start(port: number = 5000) {
        
    }

}

const application = new App();

export default application;