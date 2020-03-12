import express = require('express');;

var router = express.Router();


// Controller de Home
import HomeController from './HomeController';
router.use('/', HomeController);

// Controller de Login
import LoginController from './LoginController';
router.use('/login', LoginController);

export default router;