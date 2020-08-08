import { createConnection } from "typeorm";
import express = require("express");
import { CrudController } from "./Controller";
import { ProfileDatabase, UserDatabase, MechanicDatabase } from "../database";
import { generateSaltedPassword } from "../utils";

export class MechanicController implements CrudController {
    async insert(req: express.Request, res: express.Response) {
        createConnection().then(async connection => {
            try {
                const request = {
                    email: req.body.email,
                    passwordHash: await generateSaltedPassword(req.body.password)
                };
                const profile = await ProfileDatabase.getProfile(connection, "MECHANIC");
                if(profile === undefined){
                    res.status(500).send({ success: false, err: 'Profile não definido' });
                    return;
                }
                const user = await UserDatabase.createUser(connection, request, profile!!);
                await MechanicDatabase.createMechanic(request, connection);
                res.status(200).send({success: true, user})
            }
            catch (err) {
                res.status(500).send({ success: false, err})
            }
            finally {
                connection.close();
            }
        })
        .catch(err => {
                console.log(err);
                res.status(500).send({ success: false, err });
        })
    }
}
