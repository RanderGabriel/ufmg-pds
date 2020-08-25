import DatabaseService, { IDatabaseService } from "./DatabaseService";
import { Vehicle } from "../entity";

export default class VehicleService extends DatabaseService<Vehicle> implements IDatabaseService<Vehicle> {
    
    constructor() {
        super();
    }
    
    public async create(entity: Vehicle) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Vehicle).save(entity);
            }) as Vehicle;
        } catch (error) {
            throw error;
        }
    }
    
    public async get(id: number): Promise<Vehicle> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Vehicle).findOne(id);
            }) as Vehicle;
        } catch (error) {
            throw error;
        }
    }
    
    public async getAll(): Promise<Vehicle[]> {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Vehicle).find();
            }) as Vehicle[];
        } catch (error) {
            throw error;
        }
    }
    
    public async update(entity: Vehicle) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Vehicle).save(entity);
            });
        } catch (error) {
            throw error;
        }
    }
    
    public async delete(id: number) {
        try {
            return await this.execute(async (connection) => {
                return await connection.getRepository(Vehicle).delete(id);
            });
        } catch (error) {
            throw error;
        }
    }
    
}

export const vehicleService = new VehicleService();
