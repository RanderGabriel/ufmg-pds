import express = require('express');
import cors = require('cors');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

export default router;