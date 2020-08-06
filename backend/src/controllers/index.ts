import * as express from 'express';

const router = express.Router();

const apiRouter = express.Router();

import VehicleController from './VehicleController';
apiRouter.use('/vehicle', VehicleController);

router.use('/api', apiRouter);

export default router;