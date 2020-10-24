import { DatabaseService } from "./DatabaseService";
import { Evaluation } from "../entity";
import { getRepository } from "typeorm";

export default class EvaluationService extends DatabaseService<Evaluation> {
    
    constructor() {
        super(getRepository(Evaluation));
    }     
}

export const evaluationService = new EvaluationService();