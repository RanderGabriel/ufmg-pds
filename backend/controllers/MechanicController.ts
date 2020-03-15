import express = require('express');
import { DatabaseLayer } from '../db/db';
import { Mechanic } from '../types';
const bcrypt = require('bcrypt');

var router = express.Router();
const db = new DatabaseLayer();

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const mechanic : Mechanic = {
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            profile: "MECHANIC"
        }
        await db.createMechanic(mechanic);
    } catch (err) {
        res.status(500).send({ success: false });
        return;
    }
    res.send({ success: true });
});

export default router;