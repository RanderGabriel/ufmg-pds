import * as express from "express";
import { ApiResponse } from "../models";

export async function authenticate(req:  express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.headers["authorization"];
    const isAuthenticated = token ? true : false;

    if (isAuthenticated) {
        next();
    } else {
        res.send(ApiResponse.returnError({
            message: "UNAUTHENTICATED",
        }));
    }
}