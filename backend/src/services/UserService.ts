import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { User } from "../entity";

export default class UserService extends DatabaseService<User> implements IDatabaseService<User> {
    
    constructor() {
        super();
    }
    
    public async create(entity: User) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).save(entity);
            }) as User;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<User> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).findOne(id);
            }) as User;
        } catch (error) {
            throw error;
        }
    }

    public async getByProperty(query: {
        email?: string;
        name?: string;
        phoneNumber?: string; 
    }){
          try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).findOne({
                    where: query
                })
            }) as User;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<User[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).find();
            }) as User[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: User) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(User).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const userService = new UserService();