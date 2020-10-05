import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Request } from "../entity";

export default class RequestService extends DatabaseService<Request> implements IDatabaseService<Request> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Request) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).save(entity);
            }) as Request;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Request> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).findOne(id);
            }) as Request;
        } catch (error) {
            throw error;
        }
    }

    public async getByProperty(query: {
        id: string
    }){
          try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).findOne({
                    where: query
                })
            }) as Request;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Request[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).find();
            }) as Request[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Request) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Request).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const requestService = new RequestService();