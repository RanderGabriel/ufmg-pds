import { createConnection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User } from "../entity/User";

export class LoginController{
    
    async insert(req :express.Request, res: express.Response) {
        res.send(200).send({
            token: 'abc123',
        });
    }

    async reset(req :express.Request, res: express.Response) {
        createConnection().then(async connection => {
            const { email } = req.body.email;
            const userRepository = connection.getRepository(User);
            
            const user = await userRepository.findOne({ email });
            if(!user)
                res.status(400).send({ error: 'Usuário não encontrado, tente novamente.' });
           
            const token = crypto.randomBytes(20).toString('hex');

            const now: Date = new Date();
            now.setHours(now.getHours() + 1);

            user.passwordResetToken = token;
            user.passwordResetExpires = now;

            await userRepository.save(user);

            connection.close();
            res.status(200).send({success: true, user});
         
        })
        .catch(err => {
                console.log(err);
                res.status(400).send({ success: false, err });
        })
    }
}

