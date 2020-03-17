import { createConnection } from "typeorm";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { ProfileDatabase, UserDatabase, DriverDatabase } from "../database";

export class DriverController implements CrudController {
    async insert(req: express.Request, res: express.Response) {
        createConnection().then(async connection => {
            const request = {
                email: req.body.email,
                passwordHash: await generateSaltedPassword(req.body.password)
            };

            const profile = await ProfileDatabase.getProfile(connection, "DRIVER");

            if(profile === undefined){
                connection.close();
                res.status(500).send({ success: false, err: 'Profile não definido' });
            }
            else{
                const user = await UserDatabase.createUser(connection, request, profile);
                await DriverDatabase.createDriver(connection, request.email);
                connection.close();
                res.status(200).send({success: true, user})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ success: false, err });
        })
    }

}