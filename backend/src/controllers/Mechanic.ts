import {createConnection} from "typeorm";
import "reflect-metadata";
import { Mechanic } from "../types";
import { generateSaltedPassword } from "../utils";
import express = require('express');
import { Controller } from './controller'

export class mechanicController implements Controller {

    async insert(req: express.Request, res: express.Response) {
        
        const mechanic = {
            email: req.body.email,
            passwordHash: await generateSaltedPassword(req.body.password)
                .catch(err => res.status(500).send({ success: false, err })),
            profile: "MECHANIC"
        };
    
        createConnection()
        .then(  connection => {
            connection.manager
                .save(mechanic)
                .then( _ => res.send({ success: true, mechanic}))
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ success: false, err})
        })
            
        
    }
}