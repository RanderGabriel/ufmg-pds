import { getConnection, Connection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User, Access} from "../entity";
import { userService } from '../services/UserService'
import * as bcrypt from 'bcrypt';
import BaseController from "./BaseController";
import { ApiResponse } from "../models";

export class LoginController extends BaseController {

    constructor() {
        super();
        this.router.post('/', this.index);
    }

    async index(req: express.Request, res: express.Response) {
        const { email, password } = req.body;

        const user = await userService.getByProperty({email: email});

        if (!user) {
            res.status(500).send(ApiResponse.returnError({
                message: "Usuário não encontrado!",
            }));
            return;
        }

        if (await bcrypt.compare(password, user.passwordHash)) {
            const token = crypto.randomBytes(20).toString('hex');
            await AccessDatabase.createAccess(getConnection(), user, token);

            res.send(ApiResponse.returnData({
                token,
                user,
            }));

        } else {
            res.status(500).send(ApiResponse.returnError({
                message: "Senha inválida.",
            }));
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

const router = new LoginController().router
export default router;


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