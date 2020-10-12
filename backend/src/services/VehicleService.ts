import { DatabaseService } from "./DatabaseService";
import { Vehicle } from "../entity";
import { getRepository } from "typeorm";

export default class VehicleService extends DatabaseService<Vehicle> {
    
    constructor() {
        super(getRepository(Vehicle));
    }

    public async getAllByOwnerId(ownerId: number): Promise<Vehicle[]> {
        try {
             return await this.repo.find({ where: { owner: ownerId }});  
        } catch (error) {
            throw error;
        }
    }   
}

export const vehicleService = new VehicleService();
