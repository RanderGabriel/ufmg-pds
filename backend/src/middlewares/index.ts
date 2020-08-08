import express = require('express');
import cors = require('cors');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cors());

export default router;