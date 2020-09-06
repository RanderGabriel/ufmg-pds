import { getConnection, Connection } from "typeorm";

export interface IDatabaseService<T> {
    get: (id: number) => Promise<T>;
    getAll: (id: number) => Promise<T[]>;
    create: (entity: T) => Promise<T>;
    update: (entity: T) => void;
    delete: (id: number) => void;
}

export default class DatabaseSevice<T> {

    async execute(fn: (connection: Connection) => any): Promise<T | T[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await fn(getConnection());
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }

}
