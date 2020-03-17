import { createConnection } from "typeorm";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { Mechanic } from "../entity/Mechanic";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

export class MechanicController implements CrudController {
    async insert(req: express.Request, res: express.Response) {
        createConnection().then(async connection => {

            const profileRepository = connection.getRepository(Profile);
            const userRepository = connection.getRepository(User);
            const mechanicRepository = connection.getRepository(Mechanic);

            const profile = await profileRepository.findOne({ name: "MECHANIC" });

            const user = new User();
            user.email = req.body.email;
            user.passwordHash = await generateSaltedPassword(req.body.password);
            if (profile !== undefined)
                user.profile = profile;

            const mechanic = new Mechanic();
            mechanic.userEmail = req.body.email;

            await userRepository.save(user);
            await mechanicRepository.save(mechanic);

            connection.close();
            res.status(200).send({success: true, user})
        })
        .catch(err => {
                console.log(err);
                res.status(500).send({ success: false, err });
        })
    }
}
