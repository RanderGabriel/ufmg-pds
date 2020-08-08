import * as express from 'express';

const router = express.Router();

const apiRouter = express.Router();

import VehicleController from './VehicleController';
apiRouter.use('/vehicle', VehicleController);

import MechanicRouter from "../routers/Mechanic";
apiRouter.use("/mechanic", MechanicRouter);

import DriverRouter from "../routers/Driver";
apiRouter.use("/driver", DriverRouter);

import LoginRouter from "../routers/Login";
apiRouter.use("/login", LoginRouter);

router.use('/api', apiRouter);

export default router;