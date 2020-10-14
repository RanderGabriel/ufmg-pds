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

    public async get(id: number): Promise<Solicitation> {
        try {
            return await this.repo.findOne(id, {
                relations: ["mechanic", "driver"],
            });
        } catch (error) {
            throw error;
        }
    }

    public async getByIdMechanic(id: number): Promise<Solicitation> {
        try {
            return await this.repo.findOne(id, {
                relations: ["mechanic"],
            });
        } catch (error) {
            throw error;
        }
    }
       
}

export const solicitationService = new SolicitationService();