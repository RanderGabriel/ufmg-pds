import { Express } from 'express';
import express = require('express');
import middlewares from './middlewares';
import "reflect-metadata";
import { createConnection } from "typeorm";
import {Profile} from './entity/Profile';

class App {
    
    private app: Express;

    constructor() {
        this.initDb();
        
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

    private start(port: number = 5000) {
        this.app.listen(port, () => {
            console.log(`Servidor funcionando na porta :${port}`);
        });
    }

}

App.main();