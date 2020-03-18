import { createConnection, Connection } from "typeorm";
import express = require('express');
import crypto = require('crypto');
import { User } from "../entity/User";
import { generateSaltedPassword } from "../utils";
import { UserDatabase } from "../database";
import * as bcrypt from 'bcrypt';
import { Access } from "../entity/Access";
import * as nodemailer from 'nodemailer'; 

export class LoginController{

    async insert(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
        password: req.body.password as string };
        const connection = await createConnection();
        const user = await UserDatabase.getUser(connection, data.email);
        if(!user) {
            res.status(500).send({ success: false, message: "Usuário não encontrado" });
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

    async forgot(req :express.Request, res: express.Response) {
        const { email } = req.body;
        const connection = await createConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne({ email });
        if(user === undefined) {
            res.status(500).send({ success: false, message: "Usuário não encontrado" });
            connection.close();
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

            connection.close();
            res.status(200).send({success: true, user});
        }
    }

    async reset(req: express.Request, res: express.Response) {
        const data = { email: req.body.email as string,
        password: req.body.password as string,
        passwordResetToken: req.body.token as string };
        const connection = await createConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne(data.email);
        if(!user) {
            res.status(500).send({ success: false, message: "Usuário não encontrado." });
            connection.close();
            return;
        }
        
        if(data.passwordResetToken != user.passwordResetToken) {
            res.status(500).send({ success: false, message: "Token inválido." });
            connection.close();
            return;
        }

        const now: Date = new Date();
        if(now > user.passwordResetExpires){
            res.status(500).send({ success: false, message: "Token expirado, gere um novo." });
            connection.close();
            return;
        }

        user.passwordHash = await generateSaltedPassword(data.password);
        await userRepository.save(user);

        connection.close();
        res.status(200).send({success: true, user});
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