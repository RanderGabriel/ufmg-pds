import express = require("express");
import { DatabaseLayer } from "../db/db";
import { Mechanic } from "../types";
import { generateSaltedPassword } from "../utils";

var router = express.Router();
const db = new DatabaseLayer();

router.post("/", async (req, res) => {
  try {
    const mechanic: Mechanic = {
      email: req.body.email,
      passwordHash: await generateSaltedPassword(req.body.password),
      profile: "MECHANIC"
    };
    await db.createMechanic(mechanic);
  } catch (err) {
    res.status(500).send({ success: false });
    return;
  }
  res.send({ success: true });
});

export default router;
