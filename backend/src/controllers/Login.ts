import express = require('express');
import {Controller} from './controller';

export class loginController implements Controller {
    
    async insert(req :express.Request, res: express.Response) {
        res.send(200).send({
            token: 'abc123',
        });
    }
    
}

