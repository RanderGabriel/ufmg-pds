import express = require("express");
import { Driver, User, Profile } from "../entity";
import BaseController from "./BaseController";
import { ApiResponse } from '../models';
import { driverService } from '../services/DriverService';
import { userService } from '../services/UserService';
import { profileService } from '../services/ProfileService'
import { generateSaltedPassword } from "../utils";

class DriverController extends BaseController<Driver> {

    constructor() {
        super();

        this.router.post('/create', this.create);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const driverProfile: Profile = await (await profileService.getAll()).find(
                profile => profile.name === "Driver"
            )
            
            const user = new User();
            user.email = req.body.email;
            user.passwordHash = await generateSaltedPassword(req.body.password);
            user.phoneNumber = req.body.phoneNumber;
            user.name = req.body.name;
            user.profile = driverProfile;

            const userResponse = await userService.create(user);

            const driver = new Driver();
            driver.user = user;

            const entity = await driverService.create(driver);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new DriverController().router
export default router