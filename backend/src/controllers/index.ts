import * as express from 'express';
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

const apiRouter = express.Router();

import VehicleController from './VehicleController';
apiRouter.use('/vehicle', authenticate, VehicleController);

import MechanicRouter from "../routers/Mechanic";
apiRouter.use("/mechanic", authenticate, MechanicRouter);

import DriverRouter from "../routers/Driver";
apiRouter.use("/driver", authenticate, DriverRouter);

import LoginRouter from "../routers/Login";
apiRouter.use("/login", LoginRouter);

router.use('/api', apiRouter);

export default router;