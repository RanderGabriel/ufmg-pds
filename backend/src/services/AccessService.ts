import { DatabaseService } from "./DatabaseService";
import { getRepository } from 'typeorm';
import { Access } from "../entity";

export default class AccessService extends DatabaseService<Access> {
    
    constructor(){
        super(getRepository(Access));
    }

    public async getByToken(token: string, includeUser: boolean = false): Promise<Access> {
        try {
                return await this.repo.findOne({
                    where: {
                        userToken: token,
                    },
                    ...(includeUser ? {
                        relations:["user"]
                    } : {})
                });
        } catch (error) {
            throw error;
        }
    }
}

export const accessService = new AccessService();
