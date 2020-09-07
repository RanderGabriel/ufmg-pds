import * as nodemailer from 'nodemailer'; 
import { User } from '../entity';
import { url } from 'inspector';
import { URL } from 'url';
import { urlencoded } from 'express';
import { prototype } from 'module';

export default class MailerService {

    constructor() { }
    
    public async config() {
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      return transporter;
    }

    public async send(entity: User) {
        try {
          const transporter = await this.config();

          const info = await transporter.sendMail({
            from: '"Encontre um Mecânico" <no-reply@findamechanic>',
            to: entity.email,
            subject: "Recuperação de acesso ✔",
            html: `<p>Olá <b>${entity.name}</b>!</p>
                    <br/>
                    <p><a href="http://localhost:8080/login/reset?email=${entity.email}&token=${entity.passwordResetToken}">Clique aqui</a> para redefinir sua senha.</p>
                    <br/>
                    <p>Atenciosamente,</p>
                    <p>Encontre um Mecânico.</p>`,
          });

          //console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

          return true;

        } catch (error) {
            throw error;
        }
    }
}

export const mailerService = new MailerService();