import express = require('express');
import { loginController } from '../controllers/Login';

const  router = express.Router();
const controller = new loginController();

router.post('/login', async (req :express.Request, res: express.Response) => {
    controller.insert(req, res);
});

export default router;