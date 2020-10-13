import { Repository } from "typeorm";

export interface IDatabaseService<T> {
    get: (id: number) => Promise<T>;
    getAll: (id: number) => Promise<T[]>;
    create: (entity: T) => Promise<T>;
    update: (entity: T) => void;
    delete: (id: number) => void;
}

export class DatabaseService<T> implements IDatabaseService<T> {
    repo: Repository<T>;

    constructor(repo: Repository<T>) {
        this.repo = repo;
    }

    public async create(entity: T) {
        return await this.repo.save(entity);
    }

    public async get(id: number): Promise<T> {
        try {
            return await this.repo.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<T[]> {
        try {
            return await this.repo.find();
        } catch (error) {
            throw error;
        }
    }

    public async update(entity: T) {
        try {
            return await this.repo.save(entity);
        }
        catch (error) {
            throw error;
        }
    }

    public async delete (id: number) {
        try{
            return await this.repo.delete(id);
        }
        catch (error) {
            throw error;
        }
    }
}
