import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Access } from "../entity";

export default class AccessService extends DatabaseService<Access> implements IDatabaseService<Access> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Access) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).save(entity);
            }) as Access;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Access> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).findOne(id);
            }) as Access;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Access[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).find();
            }) as Access[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Access) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }

    public async getByToken(token: string): Promise<Access> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Access).findOne({
                    where: {
                        userToken: token
                    }
                });
            }) as Access;
        } catch (error) {
            throw error;
        }
    }
    
}

export const accessService = new AccessService();
