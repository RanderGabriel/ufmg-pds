import express = require('express');

export class loginController{
    
    async insert(req :express.Request, res: express.Response) {
        res.send(200).send({
            token: 'abc123',
        });
    }
    
}

