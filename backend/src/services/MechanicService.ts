import { DatabaseService }from "./DatabaseService";
import { Mechanic } from "../entity";
import { getRepository } from "typeorm";

export default class MechanicService extends DatabaseService<Mechanic> {
    
    constructor() {
        super(getRepository(Mechanic));
    }

    public async getByUserId(userId: number) {
        try {
            return await this.repo.findOne({
                where: {
                    user: {
                        id: userId
                    }
                },
                relations: ["user"],
            });   
        } catch (error) {
            throw error;
        }
    }
}

export const mechanicService = new MechanicService();