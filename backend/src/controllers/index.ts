import * as express from 'express';
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

const apiRouter = express.Router();

import UserController from './UserController';
apiRouter.use('/user', UserController);

import VehicleController from './VehicleController';
apiRouter.use('/vehicle', VehicleController);

import LoginController from './LoginController';
apiRouter.use('/login', LoginController);

import MechanicRouter from "./MechanicController";
apiRouter.use("/mechanic", MechanicRouter);

import DriverRouter from "./DriverController";
apiRouter.use("/driver", DriverRouter);

import RequestRouter from "./RequestController";
apiRouter.use("/request", RequestRouter);

router.use('/api', apiRouter);

export default router;