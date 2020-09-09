import * as express from 'express';
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

const apiRouter = express.Router();

import UserController from './UserController';
apiRouter.use('/user', UserController);

import VehicleController from './VehicleController';
apiRouter.use('/vehicle', VehicleController);

import MechanicRouter from "./MechanicController";
apiRouter.use("/mechanic", MechanicRouter);

import AutoshopRouter from "./AutoshopController";
apiRouter.use("/autoshop", AutoshopRouter);

import DriverRouter from "./DriverController";
apiRouter.use("/driver", DriverRouter);

import LoginRouter from "../routers/Login";
apiRouter.use("/login", LoginRouter);

router.use('/api', apiRouter);

export default router;