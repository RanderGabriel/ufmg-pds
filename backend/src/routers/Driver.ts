import express = require('express');
import {DriverController}  from '../controllers/Driver';

const router = express.Router();
const controller = new DriverController();

router.post('', async (req :express.Request, res:express.Response) => {
    try {
        const result = await controller.insert(req.body);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }  
});

export default router;