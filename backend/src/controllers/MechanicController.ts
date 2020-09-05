import express = require("express");
import { Mechanic} from "../entity";
import BaseController from "./BaseController";
import { ApiResponse } from '../models';
import{ mechanicService } from '../services/MechanicService';

class MechanicController extends BaseController<Mechanic> {

    constructor(){
        super();

        this.router.post('/create', this.create);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const entity = await mechanicService.update(req.body);

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