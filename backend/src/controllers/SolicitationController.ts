import express = require("express");
import BaseController from "./BaseController";
import { Solicitation } from "../entity";
import { ApiError, ApiResponse } from '../models';
import { solicitationService, driverService, profileService, userService } from '../services'
import { accessService } from "../services/AccessService";
import WebsocketService from '../services/WebsocketService';

class SolicitationController extends BaseController {

    constructor() {
        super();
        this.router.post('/create', this.create);
        this.router.post('/accept', this.accept);
        this.router.post('/start', this.start);
        this.router.post('/cancel', this.cancel);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const { message } = req.body;
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);

            const newSolicitation = Solicitation.createEntity(message, driver);

            const responseData = await solicitationService.create(newSolicitation);
            WebsocketService.emit("newSolicitation", { solicitation: responseData });
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async accept(req: express.Request, res:  express.Response) {
        //TODO: Implementar aceite da solicitação pelo mecânico (coloquei aqui só pra conseguir implementar a parte do motorista)
        WebsocketService.emit("acceptedSolicitation_" + req.body.id, {
            // Dados do mecânico
            name: "Fulano da silva",
            id: 1
        });
        res.send(ApiResponse.returnData({
            id: req.body.id
        }))
    }

    public async start(req: express.Request, res:  express.Response) {
        try {
            const { id } = req.body;
            const solicitation = await solicitationService.get(Number(id));
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);
            if(!driver) {
                throw new Error("Somente motoristas podem inciar solicitações");
            }
            if(solicitation.driver.id !== driver.id) {
                throw new Error("Um motorista só pode inciar solicitações criadas por ele mesmo.");
            }
            solicitation.startedAt = new Date();
            const result = await solicitationService.update(solicitation);
            res.send(ApiResponse.returnData(null));
        } catch (err) {
            res.send(ApiResponse.returnError(new ApiError(err.message)));
        }
    }

    public async cancel(req: express.Request, res:  express.Response) {
        try {
            const { id } = req.body;
            const solicitation = await solicitationService.get(Number(id));
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);
            if(!driver) {
                throw new Error("Somente motoristas podem cancelar solicitações");
            }
            if(solicitation.driver.id !== driver.id) {
                throw new Error("Um motorista só pode cancelar solicitações criadas por ele mesmo.");
            }
            solicitation.cancelledAt = new Date();
            const result = await solicitationService.update(solicitation);
            res.send(ApiResponse.returnData(null));
        } catch (err) {
            res.send(ApiResponse.returnError(new ApiError(err.message)));
        }
    }
}

const router = new SolicitationController().router
export default router