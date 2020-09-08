import * as express from 'express';
import BaseController from './BaseController';
import { userService } from '../services/UserService';
import { accessService } from '../services/AccessService';
import { mailerService } from '../services/MailerService'
import { User, Access } from '../entity';
import { ApiResponse } from '../models';
import { generateSaltedPassword } from "../utils";
import crypto = require('crypto');

class UserController extends BaseController<User> {

    constructor() {
        super();
        this.router.post('/create', this.create);
        //this.router.get('/get', this.get);
        //this.router.get('/getAll', this.getAll);
        //this.router.post('/update', this.update);
        //this.router.get('/delete', this.delete);
        this.router.post('/forgot-password', this.forgotPassword);
        this.router.post('/reset-password', this.resetPassword);
        this.router.post('/logoff', this.logoff)
    }

    public async forgotPassword(req: express.Request, res: express.Response) {
        const request = req.body;
        try {
            const user: User = await userService.getByProperty({ email: request.email });
            if(user === undefined) {
                res.send(ApiResponse.returnError({
                    message: "Usuário não encontrado!"
                }));
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                const now: Date = new Date();
                now.setHours(now.getHours() + 1);

                user.passwordResetToken = token;
                user.passwordResetExpires = now;

                const response = await userService.update(user);

                if(await mailerService.send(user) == true) {
                    res.send(ApiResponse.returnData({
                        message: "Solicitação recebida com sucesso! Verifique sua caixa de e-mail."
                    }));
                } else {
                    res.send(ApiResponse.returnError({
                        message: "Ops, algum erro aconteceu. Tente novamente!"
                    }));
                }
            }

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    async resetPassword(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
                       password: req.body.password as string,
                       passwordConfirmation: req.body.passwordConfirmation as string,
                       passwordResetToken: req.body.token as string 
        };
        
        const user: User = await userService.getByProperty({ email: data.email });
        user.passwordHash = await generateSaltedPassword(data.password);
        
        if(!user) {
            res.send(ApiResponse.returnError({ message: "Usuário não encontrado." }));
            return;
        }
        
        if(data.passwordResetToken != user.passwordResetToken) {
            res.send(ApiResponse.returnError({ message: "Token inválido! Verifique seu e-mail novamente." }));
            return;
        }

        const now: Date = new Date();
        if(now > user.passwordResetExpires){
            res.send(ApiResponse.returnError({ message: "Token expirado, gere uma nova solicitação." }));
            return;
        }

        if(data.password != data.passwordConfirmation) {
            res.send(ApiResponse.returnError({ message: "As senhas não são idênticas." }));
            return;
        }
        
        const response = await userService.update(user);
        res.send(ApiResponse.returnData(user));
    }

    public async create(req: express.Request, res: express.Response) {
        try {
            const entity = await userService.create(req.body);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async get(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id) || 0;
            const entity = await userService.get(id);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async getAll(req: express.Request, res: express.Response) {
        const request = req.body
        try {
            const entities = await userService.getAll();

            res.send(ApiResponse.returnData(entities));

        } catch (error) {
            res.status(500).send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async update(req: express.Request, res: express.Response) {
        try {
            const entity = await userService.update(req.body);

            res.send(ApiResponse.returnData(entity));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
    
    public async delete(req: express.Request, res: express.Response) {
        try {
            const id = Number(req.query.id) || 0;
            await userService.delete(id);

            res.send(ApiResponse.returnData(id));

        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }

    public async logoff(req: express.Request, res: express.Response) {
        try {
            const token = req.headers["authorization"];
            const access: Access = await accessService.getByToken(token)
            await accessService.delete(access.id);
            res.send(ApiResponse.returnData(null));
        } catch (error) {
            res.send(ApiResponse.returnError({
                message: error,
            }));
        }
    }
}

const router = new UserController().router
export default router