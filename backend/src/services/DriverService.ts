import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Driver } from "../entity";

export default class DriverService extends DatabaseService<Driver> implements IDatabaseService<Driver> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Driver) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).save(entity);
            }) as Driver;
        } catch (error) {
            throw error;
        }
    }

    
    public async get(id: number): Promise<Driver> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).findOne(id);
            }) as Driver;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Driver[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).find();
            }) as Driver[];
        } catch (error) {
            throw error;
        }
    }

    public async getByUserId(userId: number) : Promise<Driver> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).findOne({
                    where: {
                        user: {
                            id: userId
                        }
                    }
                });
            }) as Driver;
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Driver) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).save(entity);
            }) as Driver;
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Driver).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const driverService = new DriverService();