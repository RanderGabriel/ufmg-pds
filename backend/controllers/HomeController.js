"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
});
exports["default"] = router;
