import { DatabaseService } from "./DatabaseService";
import { Evaluation } from "../entity";
import { getRepository } from "typeorm";

export default class EvaluationService extends DatabaseService<Evaluation> {
    
    constructor() {
        super(getRepository(Evaluation));
    }
    
    public async getByMechanicId(id: number) : Promise<Evaluation []> {
        try {
            return await this.repo.find({
                where: {
                    mechanic: id 
                }
            });   
        } catch (error) {
            throw error;
        }
    }


    public async getByDriverId(id: number) : Promise<Evaluation []> {
        try {
            return await this.repo.find({
                where: {
                    driver: id 
                }
            });   
        } catch (error) {
            throw error;
        }
    }
}

export const evaluationService = new EvaluationService();