import express = require("express");
import BaseController from "./BaseController";
import { Evaluation } from "../entity";
import { ApiResponse } from '../models';
import { driverService, mechanicService, evaluationService } from '../services'
import { accessService } from "../services/AccessService";

class EvaluationController extends BaseController {

    constructor() {
        super();
        this.router.post('/create', this.create);
        this.router.get('/get', this.get);
        this.router.get('/mechanic', this.getByMechanicId);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const {comment, grade, mechanicId, createdBy}  = req.body;
            const { user } = await accessService.getByToken(req.headers["authorization"], true);
            const driver = await driverService.getByUserId(user.id);
            if(!driver) {
                throw new Error("Apenas motoristas podem criar avaliações");
            }
            const mechanic = await mechanicService.get(mechanicId)
            const newEvaluation = Evaluation.createEntity(comment, createdBy, grade, driver, mechanic);

            const responseData = await evaluationService.create(newEvaluation);
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async getByMechanicId(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id);
            if(id === undefined){
                res.send(ApiResponse.returnData([]));
            }
            const responseData = await evaluationService.getByMechanicId(id);
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            console.log(error)
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async getByDriverID(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id);
            if(id === undefined){
                res.send(ApiResponse.returnData([]));
            }
            const responseData = await evaluationService.getByDriverId(id);
            res.send(ApiResponse.returnData(responseData));
        } catch (error) {
            console.log(error)
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new EvaluationController().router
export default router