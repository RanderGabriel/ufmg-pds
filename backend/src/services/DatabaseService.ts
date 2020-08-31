import { createConnection, Connection, Repository } from "typeorm";

export interface IDatabaseService<T> {
    get: (id: number) => Promise<T>;
    getAll: (id: number) => Promise<T[]>;
    create: (entity: T) => Promise<T>;
    update: (entity: T) => void;
    delete: (id: number) => void;
}

export default class DatabaseSevice<T> {

    async execute(fn: (connection: Connection) => any): Promise<T|T[]> {
        return new Promise(async (resolve, reject) => {
            createConnection()
                .then(async (connection) => {
                    try {
                        const result = await fn(connection);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    } finally {
                        connection.close();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

}
