import express = require('express');
import {DriverController}  from '../controllers/Driver';

const router = express.Router();
const controller = new DriverController();

router.post('/api/driver', async (req :express.Request, res:express.Response) => {
    controller.insert(req, res);
});

export default router;