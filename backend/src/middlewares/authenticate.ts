import * as express from "express";
import { LoginController } from "../controllers/Login";
//TODO: Migrar para service
const loginController = new LoginController();

export const authenticate = async (
    req:  express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    const token = <string>req.headers["authorization"];
    const isAuthenticated = await loginController.isAuthenticated(token);
    if(isAuthenticated) {
        next();
    } else {
        response.status(403).send({ err: "Não autenticado!!"});
    }
}