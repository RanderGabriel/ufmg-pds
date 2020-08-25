import * as express from "express";
import { LoginController } from "../controllers/Login";
import { ApiResponse } from "../models";
//TODO: Migrar para service
const loginController = new LoginController();

export async function authenticate(req:  express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.headers["authorization"];
    const isAuthenticated = await loginController.isAuthenticated(token);

    if (isAuthenticated) {
        next();
    } else {
        res.send(ApiResponse.returnError({
            message: "UNAUTHENTICATED",
        }));
    }
}