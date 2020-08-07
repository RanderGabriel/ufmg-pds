"use strict";
exports.__esModule = true;
var express = require("express");
var Login_1 = require("../routers/Login");
var Mechanic_1 = require("../routers/Mechanic");
var Driver_1 = require("../routers/Driver");
var router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(Login_1["default"]);
router.use(Mechanic_1["default"]);
router.use(Driver_1["default"]);
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
exports["default"] = router;
