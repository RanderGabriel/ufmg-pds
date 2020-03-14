import express = require('express');
import { DatabaseLayer, Driver } from '../db/db';
const bcrypt = require('bcrypt');

var router = express.Router();
const db = new DatabaseLayer();

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const driver : Driver = {
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            profile: "DRIVER"
        }
        await db.createDriver(driver);
    } catch (err) {
        res.status(500).send({ success: false });
        return;
    }
    res.send({ success: true });
});

export default router;