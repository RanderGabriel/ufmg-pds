import express = require("express");
import BaseController from "./BaseController";
import { Solicitation } from "../entity";
import { ApiError, ApiResponse } from '../models';
import { solicitationService, driverService, userService, mechanicService} from '../services'
import { accessService } from "../services/AccessService";
import WebsocketService from '../services/WebsocketService';

class SolicitationController extends BaseController {

    constructor() {
        super();
        this.router.post('/create', this.create);
        this.router.post('/accept', this.accept);
        this.router.post('/start', this.start);
        this.router.post('/cancel', this.cancel);
        this.router.post('/finish', this.finish);
        this.router.get("/getAll", this.getAll);
        this.router.get("/actives", this.actives);
    }

    public async getAll(req: express.Request, res: express.Response) {
        try {
            const responseData = await solicitationService.getAll();
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            res.send(ApiResponse.returnData({
                message: error,
            }))
        }
    }

    public async actives(req: express.Request, res: express.Response) {
        try {
            const responseData = await solicitationService.actives();
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            res.send(ApiResponse.returnData({
                message: error,
            }))
        }
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

    public async accept(req: express.Request, res: express.Response) {
        //TODO: Implementar aceite da solicitação pelo mecânico (coloquei aqui só pra conseguir implementar a parte do motorista)
        try {
            const { id } = req.body;
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            console.log(user);
            const mechanic = await mechanicService.getByUserId(user.id);
            if(!mechanic) {
                throw new Error("Somente mecâncos podem aceitar solicitações");
            }
            // TODO: Rever mecanismo de transações.
            // Esse é o único ponto que eu imagino que seja necessário, mas precisamos rever
            const solicitation = await solicitationService.get(id);
            if(solicitation.mechanic == null) {
                solicitation.mechanic = mechanic;
                await solicitationService.create(solicitation)
            } else {
                throw new Error("Essa solicitação já foi aceita por algum mecânico");
            }
            WebsocketService.emit("acceptedSolicitation_" + req.body.id, {
                // Dados do mecânico
                name: mechanic.user.name,
                id: mechanic.id
            });
            res.send(ApiResponse.returnData({
                id: req.body.id
            }))
        } catch (err) {
            res.send(ApiResponse.returnError({
                message: err.message
            }))
        }
        
    }

    public async start(req: express.Request, res: express.Response) {
        try {
            const { id } = req.body;
            const solicitation = await solicitationService.get(Number(id));
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);
            if (!driver) {
                throw new Error("Somente motoristas podem inciar solicitações");
            }
            if (solicitation.driver.id !== driver.id) {
                throw new Error("Um motorista só pode inciar solicitações criadas por ele mesmo.");
            }
            res.send(ApiResponse.returnData(null));
        } catch (err) {
            res.send(ApiResponse.returnError(new ApiError(err.message)));
        }
    }

    public async cancel(req: express.Request, res: express.Response) {
        try {
            const { id } = req.body;
            const solicitation = await solicitationService.get(Number(id));
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);
            if (!driver) {
                throw new Error("Somente motoristas podem cancelar solicitações");
            }
            if (solicitation.driver.id !== driver.id) {
                throw new Error("Um motorista só pode cancelar solicitações criadas por ele mesmo.");
            }
            solicitation.finishedAt = new Date();
            const result = await solicitationService.update(solicitation);
            res.send(ApiResponse.returnData(null));
        } catch (err) {
            res.send(ApiResponse.returnError(new ApiError(err.message)));
        }
    }

    public async finish(req: express.Request, res: express.Response) {
        try {
            const { id } = req.body;
            const solicitation = await solicitationService.get(Number(id));
            solicitation.finishedAt = new Date();
            const result = await solicitationService.update(solicitation);
            res.send(ApiResponse.returnData(null));
        } catch (err) {
            res.send(ApiResponse.returnError(new ApiError(err.message)));
        }
    }
}

const router = new SolicitationController().router
export default router