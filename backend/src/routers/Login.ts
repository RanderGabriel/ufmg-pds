import express = require('express');
import { LoginController } from '../controllers/Login';

const  router = express.Router();
const controller = new LoginController();

router.post('/api/login', async (req :express.Request, res: express.Response) => {
    controller.insert(req, res);
});

router.post('/api/login/forgot-password', async (req :express.Request, res: express.Response) => {
    controller.forgot(req, res);
});

router.post('/api/login/reset-password', async (req :express.Request, res: express.Response) => {
    controller.reset(req, res);
});

export default router;