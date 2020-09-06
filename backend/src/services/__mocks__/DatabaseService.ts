import { getConnection } from "../../../__mocks__/typeorm";

export default class DatabaseSevice<T> {

    async execute(fn: (connection) => any): Promise<T|T[]> {
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
