import express = require('express');
import { LoginController } from '../controllers/Login';

const  router = express.Router();
const controller = new LoginController();

router.post('', async (req :express.Request, res: express.Response) => {
    controller.insert(req, res);
});

router.post('forgot-password', async (req :express.Request, res: express.Response) => {
    controller.forgot(req, res);
});

router.post('reset-password', async (req :express.Request, res: express.Response) => {
    controller.reset(req, res);
});

export default router;