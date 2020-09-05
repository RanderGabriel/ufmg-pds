import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Mechanic } from "../entity";

export default class MechanicService extends DatabaseService<Mechanic> implements IDatabaseService<Mechanic> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Mechanic) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Mechanic).save(entity);
            }) as Mechanic;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Mechanic> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Mechanic).findOne(id);
            }) as Mechanic;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Mechanic[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Mechanic).find();
            }) as Mechanic[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Mechanic) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Mechanic).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Mechanic).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const mechanicService = new MechanicService();