import { DatabaseLayer } from "../db/db";
import { Mechanic } from "../types";
import { generateSaltedPassword } from "../utils";
import express = require('express');
import { Controller } from './controller'
const db = new DatabaseLayer();


export class mechanicController implements Controller {

    async insert(req: express.Request, res: express.Response) {
        try {
            const mechanic: Mechanic = {
                email: req.body.email,
                passwordHash: await generateSaltedPassword(req.body.password),
                profile: "MECHANIC"
            };
            await db.createMechanic(mechanic);
        } catch (err) {
            res.status(500).send({ success: false });
            return;
        }
        res.send({ success: true });
    }
}