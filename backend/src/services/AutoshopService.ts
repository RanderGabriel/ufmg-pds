import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Autoshop } from "../entity";

export default class AutoshopService extends DatabaseService<Autoshop> implements IDatabaseService<Autoshop> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Autoshop) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Autoshop).save(entity);
            }) as Autoshop;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Autoshop> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Autoshop).findOne(id);
            }) as Autoshop;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Autoshop[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Autoshop).find();
            }) as Autoshop[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Autoshop) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Autoshop).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Autoshop).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const autoshopService = new AutoshopService();
