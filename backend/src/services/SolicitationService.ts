import { DatabaseService } from "./DatabaseService";
import { Solicitation } from "../entity";
import { getRepository } from "typeorm";

export default class SolicitationService extends DatabaseService<Solicitation> {
    
    constructor() {
        super(getRepository(Solicitation));
    }
       
}

export const solicitationService = new SolicitationService();