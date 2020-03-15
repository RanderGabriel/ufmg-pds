import express = require('express');;

var router = express.Router();


// Controller de Login
import LoginController from './LoginController';
router.use('/login', LoginController);

// Controller de motorista
import MechanicController from './MechanicController';
router.use('/api/mechanic', MechanicController);

export default router;