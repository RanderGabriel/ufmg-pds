import { createConnection, Connection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User } from "../entity/User";
import { generateSaltedPassword } from "../utils";
import { UserDatabase } from "../database";
import * as bcrypt from 'bcrypt';
import { Access } from "../entity/Access";

export class LoginController{

    async insert(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
        password: req.body.password as string };
        const connection = await createConnection();
        const user = await UserDatabase.getUser(connection, data.email);
        if(!user) {
            res.send({ success: false, message: "Usuário não encontrado" });
            connection.close();
            return;
        }
        
        if(await bcrypt.compare(data.password, user.passwordHash)) {
            const token = crypto.randomBytes(20).toString('hex');;
            const response = await AccessDatabase.createAccess(connection, user, token);
            res.send({success: true, token});
        } else {
            res.status(500).send({ success: false, message: "Senha inválida" });
        }
        connection.close();
    }

    async reset(req :express.Request, res: express.Response) {
        createConnection().then(async connection => {
            const { email } = req.body;
            const userRepository = connection.getRepository(User);
            
            const user = await userRepository.findOne({ email });
            if(user === undefined){
                connection.close();
                res.status(400).send({ error: 'Usuário não encontrado, tente novamente.' });
            }
            else{
                const token = crypto.randomBytes(20).toString('hex');

                const now: Date = new Date();
                now.setHours(now.getHours() + 1);

                user.passwordResetToken = token;
                user.passwordResetExpires = now;

                await userRepository.save(user);

                connection.close();
                res.status(200).send({success: true, user});
            }
        })
        .catch(err => {
                console.log(err);
                res.status(400).send({ success: false, err });
        })
    }
}


const AccessDatabase = {
    async createAccess (connection: Connection, user: User, userToken: string) : Promise<Access> {
        const accessRepository = connection.getRepository(Access);
        const access = new Access();
        access.user = user;
        access.userToken = userToken;
        return await accessRepository.save(access);
    }
}