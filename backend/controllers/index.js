"use strict";
exports.__esModule = true;
var express = require("express");
;
var router = express.Router();
// Controller de Home
var HomeController_1 = require("./HomeController");
router.use('/', HomeController_1["default"]);
// Controller de Login
var LoginController_1 = require("./LoginController");
router.use('/login', LoginController_1["default"]);
exports["default"] = router;
