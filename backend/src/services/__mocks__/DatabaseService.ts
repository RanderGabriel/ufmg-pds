import { createConnection } from "../../../__mocks__/typeorm";

export default class DatabaseSevice<T> {

    async execute(fn: (connection) => any): Promise<T|T[]> {
        return new Promise(async (resolve, reject) => {
            createConnection()
                .then(async (connection: any) => {
                    const result = await fn(connection);
                    resolve(result);
                })
        });
    }
}
