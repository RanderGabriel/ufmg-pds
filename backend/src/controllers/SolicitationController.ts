import express = require("express");
import BaseController from "./BaseController";
import { Solicitation } from "../entity";
import { ApiResponse } from '../models';
import { solicitationService, driverService, profileService, userService } from '../services'
import { accessService } from "../services/AccessService";
import WebsocketService from '../services/WebsocketService';

class SolicitationController extends BaseController {

    constructor() {
        super();
        this.router.post('/create', this.create);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const { message } = req.body;
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);

            const newSolicitation = Solicitation.createEntity(message, driver);

            const responseData = solicitationService.create(newSolicitation);
            WebsocketService.emit("newSolicitation", { solicitation: responseData });
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new SolicitationController().router
export default router