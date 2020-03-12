"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.post('/', function (req, res) {
    res.send(200).send({
        token: 'abc123'
    });
});
exports["default"] = router;
