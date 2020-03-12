"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
router.use(express_1["default"].urlencoded({ extended: true }));
router.use(express_1["default"].json());
router.use(express_1["default"].static('public'));
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
exports["default"] = router;
