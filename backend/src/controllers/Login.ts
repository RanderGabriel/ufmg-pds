import { getConnection, Connection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User, Access} from "../entity";
import {userService} from '../services/UserService'
import * as bcrypt from 'bcrypt';

export class LoginController{

    async insert(req: express.Request, res: express.Response) {
        const data = { 
            email: req.body.email as string,
            password: req.body.password as string 
        };
        const user = await userService.getByProperty({email: data.email})
    
        if(user === undefined) {
            res.status(500).send({ success: false, message: "Usuário não encontrado" });
            return;
        }
        
        if(await bcrypt.compare(data.password, user.passwordHash)) {
            const token = crypto.randomBytes(20).toString('hex');;
            const response = await AccessDatabase.createAccess(getConnection(), user, token);
            res.send({
                success: true,
                token,
                ...{
                    ...user,
                    passwordHash: undefined,
                    passwordResetExpires: undefined,
                    passwordResetToken: undefined,
                } as User
            });
        } else {
            res.status(500).send({ success: false, message: "Senha inválida" });
        }

    }

    //TODO: Mover para service
    public async isAuthenticated(token: string): Promise<boolean> {
        let access: Access = null;
        try {
            access = await AccessDatabase.getAccessByToken(getConnection(), token);
        } finally {
            return !!access;
        }
    }
}


const AccessDatabase = {
    async createAccess (connection: Connection, user: User, userToken: string) : Promise<Access> {
        const accessRepository = connection.getRepository(Access);
        const access = new Access();
        access.user = user;
        access.userToken = userToken;
        return await accessRepository.save(access);
    },
    async getAccessByToken(connection: Connection, token: string) : Promise<Access> {
        const accessRepository = connection.getRepository(Access);
        return await accessRepository.findOne({
            where: { userToken: token },
        });
    }
}