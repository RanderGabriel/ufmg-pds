import express = require('express');
import {MechanicController}  from '../controllers/Mechanic';

const router = express.Router();
const controller = new MechanicController();

router.post('/api/mechanic', async (req :express.Request, res:express.Response) => {
    controller.insert(req, res);
});

export default router;