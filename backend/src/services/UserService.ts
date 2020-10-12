import {DatabaseService} from "./DatabaseService";
import { User } from "../entity";
import { getRepository } from "typeorm";

export default class UserService extends DatabaseService<User> {
    
    constructor() {
        super(getRepository(User));
    }
    
    public async getByProperty(query: {
        email?: string;
        name?: string;
        phoneNumber?: string; 
        profileId?: number
    }){
          try {
            return await this.repo.findOne({
                    where: query,
                    relations: [
                        "profile"
                    ]
            })  
        } catch (error) {
            throw error;
        }
    }
      
}

export const userService = new UserService();