import { DatabaseService } from "./DatabaseService";
import { Solicitation } from "../entity";
import { getRepository } from "typeorm";

export default class SolicitationService extends DatabaseService<Solicitation> {
    
    constructor() {
        super(getRepository(Solicitation));
    }

    async actives() {
        try {
            return await this.repo.find({
                where: { finishedAt: null },
                relations: ['driver', 'driver.user']
            });
        } catch (error) {
            throw error;
        }
    }
       
}

export const solicitationService = new SolicitationService();