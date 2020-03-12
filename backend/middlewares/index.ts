import express = require('express');

var router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static(__dirname + '/public'));
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

export default router;