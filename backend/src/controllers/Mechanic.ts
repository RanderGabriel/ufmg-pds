import { createConnection } from "typeorm";
import "reflect-metadata";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { Mechanic } from "../entity/Mechanic";
import { User } from "../entity/User";

export class mechanicController implements CrudController {
  async insert(req: express.Request, res: express.Response) {
    try {
      const user = new User();
      user.email = req.body.email;
      user.passwordHash = await generateSaltedPassword(req.body.password);
      user.profile = { name: "MECHANIC" };

      const mechanic = new Mechanic();
      mechanic.user = user;
      mechanic.userEmail = user.email;

      const connection = await createConnection();
      await connection.manager.save<User>(user);
      await connection.manager.save<Mechanic>(mechanic);
      connection.close();
      res.send({ success: true, user });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  }
}
