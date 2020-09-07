import express = require("express");
import { Mechanic, User, Profile } from "../entity";
import BaseController from "./BaseController";
import { ApiResponse } from '../models';
import { mechanicService } from '../services/MechanicService';
import { userService } from '../services/UserService';
import { profileService } from '../services/ProfileService'
import { generateSaltedPassword } from "../utils";

class MechanicController extends BaseController<Mechanic> {

    constructor() {
        super();

        this.router.post('/create', this.create);
    }

    public async create(req: express.Request, res: express.Response) {
        const request = req.body

        try {
            const mechanicProfile: Profile = await profileService.getByProperty({ name: "MECHANIC" })

            const user = new User();
            user.email = request.email;
            user.passwordHash = await generateSaltedPassword(request.password);
            user.phoneNumber = request.phoneNumber;
            user.name = request.name;
            user.profile = mechanicProfile;

            const response = await userService.create(user);

            const mechanic = new Mechanic();
            mechanic.user = user;

            const entity = await mechanicService.create(mechanic);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new MechanicController().router
export default router