import express = require("express");
import { Request } from "../entity";
import BaseController from "./BaseController";
import { ApiResponse } from '../models';
import { requestService } from '../services/RequestService'
import { driverService, profileService, userService } from "../services";
import { accessService } from "../services/AccessService";

class RequestController extends BaseController<Request> {

    constructor() {
        super();
        this.router.post('/create', this.create);
    }

    public async create(req: express.Request, res: express.Response) {
        try {

            // User validation
            const access = await accessService.getByToken(req.headers["authorization"], true);
            const user = access.user;
            const driver = await driverService.getByUserId(user.id);
            if (!driver) {
                throw new Error("Somente motoristas podem criar requisições de atendimento!");
            }
            //Saving request
            const request = new Request();
            request.driver = driver;
            request.creationDate = new Date();
            await requestService.create(request);
            res.send(ApiResponse.returnData(null))
        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new RequestController().router
export default router