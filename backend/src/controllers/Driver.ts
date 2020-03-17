import { createConnection } from "typeorm";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { Driver } from "../entity/Driver";
import { User } from "../entity/User";
import { Profile } from "../entity/Profile";

export class DriverController implements CrudController {
    async insert(req: express.Request, res: express.Response) {
        createConnection().then(async connection => {
            
            const profileRepository = connection.getRepository(Profile);
            const userRepository = connection.getRepository(User);
            const driverRepository = connection.getRepository(Driver);

            const profile = await profileRepository.findOne({name: "DRIVER"});

            const user = new User();
            user.email = req.body.email;
            user.passwordHash = await generateSaltedPassword(req.body.password);
            if(profile === undefined){
                res.status(500).send({ success: false, err: 'Profile não definido' });
                connection.close();
            }
            else{
                user.profile = profile;
                const driver = new Driver();
                driver.userEmail = req.body.email;
                
                await userRepository.save(user);
                await driverRepository.save(driver);
                
                connection.close();
                res.status(200).send({success: true, user})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ success: false, err });
        })
    }
}




// try {
//   const user = new User();
//   user.email = req.body.email;
//   user.passwordHash = await generateSaltedPassword(req.body.password);
//   user.profile = { name: "MECHANIC" };

//   const mechanic = new Mechanic();
//   mechanic.userEmail = user.email;

//   const connection = await createConnection();
//   await connection.manager.save<User>(user);
//   await connection.manager.save<Mechanic>(mechanic);
//   connection.close();
//   res.send({ success: true, user });
// } catch (err) {
//   console.log(err);
//   res.status(500).send({ success: false, err });
// }