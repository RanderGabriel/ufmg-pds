import { createConnection } from "typeorm";
import { generateSaltedPassword } from "../utils";
import express = require("express");
import { CrudController } from "./Controller";
import { ProfileDatabase, UserDatabase, DriverDatabase } from "../database";
import { User } from "../entity/User";

export class DriverController implements CrudController {
    insert(requestBody) {
        return new Promise((resolve, reject) => {
            createConnection().then(async connection => {
                const request = {
                    email: requestBody.email,
                    passwordHash: await generateSaltedPassword(requestBody.password),
                    phoneNumber: requestBody.phoneNumber,
                    name: requestBody.name
                };
    
                const profile = await ProfileDatabase.getProfile(connection, "DRIVER");
    
                if(profile === undefined){
                    connection.close();
                    reject({ success: false, err: 'Profile não definido' });
                }
                else {
                    let user: User = null;
                    try {
                        user = await UserDatabase.createUser(connection, request, profile);
                        await DriverDatabase.createDriver(connection, user);
                    } catch (err) {
                        reject({success: false, err });
                        return;
                    } finally {
                        connection.close();
                    }
                    resolve({success: true,
                        ...{
                            ...user,
                            passwordHash: undefined,
                            passwordResetExpires: undefined,
                            passwordResetToken: undefined,
                        } as User
                    });
                }
            })
            .catch(err => {
                console.log(err);
                reject({ success: false, err });
            })
        })
        
    }

}