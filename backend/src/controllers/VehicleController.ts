import * as express from 'express';
import BaseController from './BaseController';
import { vehicleService } from '../services/VehicleService';
import { Vehicle } from '../entity';
import { ApiResponse } from '../models';
import { authenticate } from '../middlewares/authenticate';

class VehicleController extends BaseController<Vehicle> {

    constructor() {
        super();

        // A próxima linha faz que todos os end-points desta rota são acessados somente por usuários conectados.
        // this.router.use(authenticate);

        this.router.post('/create', this.create);
        this.router.get('/get', this.get);
        this.router.get('/getAll', this.getAll);
        this.router.post('/update', this.update);
        this.router.get('/delete', this.delete);
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const entity = await vehicleService.update(req.body);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async get(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id) || 0;
            const entity = await vehicleService.get(id);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async getAll(req: express.Request, res: express.Response) {
        try {
            const entities = await vehicleService.getAll();

            res.send(ApiResponse.returnData(entities));

        } catch (error) {
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {
            const entity = await vehicleService.update(req.body);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
    
    public async delete(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id) || 0;
            await vehicleService.delete(id);

            res.send(ApiResponse.returnData(id));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}


const router = new VehicleController().router;

export default router;
