import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Profile } from "../entity";

export default class ProfileService extends DatabaseService<Profile> implements IDatabaseService<Profile> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Profile) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).save(entity);
            }) as Profile;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Profile> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).findOne(id);
            }) as Profile;
        } catch (error) {
            throw error;
        }
    }
    
    public async getByProperty(query: { name?: string }) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).findOne({
                    where: query
                });
            }) as Profile;
        } catch (error) {
            throw error;
        }
    }


    public async getAll(): Promise<Profile[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).find();
            }) as Profile[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Profile) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Profile).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const profileService = new ProfileService();