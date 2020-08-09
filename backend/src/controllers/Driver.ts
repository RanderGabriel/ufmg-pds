import { createConnection } from "typeorm";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { ProfileDatabase, UserDatabase, DriverDatabase } from "../database";
import { User } from "../entity/User";

export class DriverController implements CrudController {
    async insert(req: express.Request, res: express.Response) {
        createConnection().then(async connection => {
            const request = {
                email: req.body.email,
                passwordHash: await generateSaltedPassword(req.body.password),
                phoneNumber: req.body.phoneNumber,
                name: req.body.name
            };

            const profile = await ProfileDatabase.getProfile(connection, "DRIVER");

            if(profile === undefined){
                connection.close();
                res.status(500).send({ success: false, err: 'Profile não definido' });
            }
            else {
                let user: User = null;
                try {
                    user = await UserDatabase.createUser(connection, request, profile);
                    await DriverDatabase.createDriver(connection, user);
                } catch (err) {
                    res.status(500).send({success: false, err });
                    return;
                } finally {
                    connection.close();
                }
                res.status(200).send({success: true,
                    ...{
                        ...user,
                        passwordHash: undefined,
                        passwordResetExpires: undefined,
                        passwordResetToken: undefined,
                    } as User
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ success: false, err });
        })
    }

}