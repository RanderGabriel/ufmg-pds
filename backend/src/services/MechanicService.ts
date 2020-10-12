import { DatabaseService }from "./DatabaseService";
import { Mechanic } from "../entity";
import { getRepository } from "typeorm";

export default class MechanicService extends DatabaseService<Mechanic> {
    
    constructor() {
        super(getRepository(Mechanic));
    }
}

export const mechanicService = new MechanicService();