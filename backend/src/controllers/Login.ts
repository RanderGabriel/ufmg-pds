import express = require('express');

export class LoginController{
    
    async insert(req :express.Request, res: express.Response) {
        res.send(200).send({
            token: 'abc123',
        });
    }

    async reset(req :express.Request, res: express.Response) {
        res.send(200).send({
            token: 'abc123',
        });
    }
    
}

