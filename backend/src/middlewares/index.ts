import express = require('express');
import LoginRouter from '../router/Login';
import MechanicRouter from '../router/Mechanic';

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use((req : express.Request, res: express.Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
router.use(LoginRouter);
router.use(MechanicRouter)

export default router;