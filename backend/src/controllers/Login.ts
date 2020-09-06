import { getConnection, Connection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User } from "../entity/User";
import { generateSaltedPassword } from "../utils";
import {userService} from '../services/UserService'
import * as bcrypt from 'bcrypt';
import { Access } from "../entity/Access";
import * as nodemailer from 'nodemailer'; 

export class LoginController{

    async insert(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
        password: req.body.password as string };
        const user = await userService.getByProperty({email: data.email})
        if(!user) {
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

    async forgot(req :express.Request, res: express.Response) {
        const { email } = req.body;
        const userRepository = getConnection().getRepository(User);
        const user = await userRepository.findOne({ email });
        if(user === undefined) {
            res.status(500).send({ success: false, message: "Usuário não encontrado" });
            return;
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            const now: Date = new Date();
            now.setHours(now.getHours() + 1);

            user.passwordResetToken = token;
            user.passwordResetExpires = now;
            await userRepository.save(user);

            //Refatorar o envio de e-mail posteriormente (Extract Class)
            const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "dde70d2c456687",
                pass: "54936f07fd5612"
            }
            });
           
            const mailOptions = { 
                from : "no-reply@findamechanic", 
                to : email, 
                subject : "Recuperação de acesso", 
                text: "Use este token ("+token+") para redefinir sua senha em até 1h."
            }; 
        
            transport.sendMail( mailOptions, (error, info) => { 
                if (error)
                    res.status(500).send({ success: false, message: "Erro ao enviar Token para o e-mail "+email+"." });
                else
                    console.log("E-mail enviado com sucesso.");
            }); 
            //Fim do envio de e-mail

            res.status(200).send({success: true, user});
        }
    }

    async reset(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
        password: req.body.password as string,
        passwordResetToken: req.body.token as string };
        const userRepository = getConnection().getRepository(User);
        const user = await userRepository.findOne(data.email);
        if(!user) {
            res.status(500).send({ success: false, message: "Usuário não encontrado." });
            return;
        }
        
        if(data.passwordResetToken != user.passwordResetToken) {
            res.status(500).send({ success: false, message: "Token inválido." });
            return;
        }

        const now: Date = new Date();
        if(now > user.passwordResetExpires){
            res.status(500).send({ success: false, message: "Token expirado, gere um novo." });
            return;
        }

        user.passwordHash = await generateSaltedPassword(data.password);
        await userRepository.save(user);

        res.status(200).send({success: true, user});
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