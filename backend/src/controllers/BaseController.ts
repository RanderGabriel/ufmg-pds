import * as express from 'express';

export default class BaseController<T> {
    
    public router: express.Router;

    constructor() {
        this.router = express.Router();
    }

}
