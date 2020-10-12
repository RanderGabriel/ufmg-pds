import { DatabaseService } from "./DatabaseService";
import { Profile } from "../entity";
import { getRepository } from "typeorm";

export default class ProfileService extends DatabaseService<Profile> {
    
    constructor() {
        super(getRepository(Profile));
    }
    
    public async getByProperty(query: { name?: string }) {
        try {
            return await this.repo.findOne({
                where: query
            }); 
        } catch (error) {
            throw error;
        }
    }   
}

export const profileService = new ProfileService();