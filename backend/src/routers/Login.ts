import express = require('express');
import { LoginController } from '../controllers/Login';

const  router = express.Router();
const controller = new LoginController();

router.post('', async (req :express.Request, res: express.Response) => {
    controller.insert(req, res);
});

export default router;