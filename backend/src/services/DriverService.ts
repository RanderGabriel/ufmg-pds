import { DatabaseService } from "./DatabaseService";
import { Driver } from "../entity";
import { getRepository } from "typeorm";

export default class DriverService extends DatabaseService<Driver>  {
    
    constructor() {
        super(getRepository(Driver));
    }
    
    public async getByUserId(userId: number) : Promise<Driver> {
        try {
            return await this.repo.findOne({
                where: {
                    user: {
                        id: userId
                    }
                }
            });   
        } catch (error) {
            throw error;
        }
    }
}

export const driverService = new DriverService();