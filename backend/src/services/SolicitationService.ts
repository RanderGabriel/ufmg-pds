import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Solicitation } from "../entity";

export default class SolicitationService extends DatabaseService<Solicitation> implements IDatabaseService<Solicitation> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Solicitation) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).save(entity);
            }) as Solicitation;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Solicitation> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).findOne(id, {
                    relations: ["mechanic", "driver"]
                });
            }) as Solicitation;
        } catch (error) {
            throw error;
        }
    }

    public async getByProperty(query: {
        id: string
    }){
          try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).findOne({
                    where: query
                })
            }) as Solicitation;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Solicitation[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).find();
            }) as Solicitation[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Solicitation) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Solicitation).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const solicitationService = new SolicitationService();