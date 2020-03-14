import { Connection, createConnection, MysqlError, FieldInfo } from "mysql";

export class DatabaseLayer {
    connection: Connection;
    
    constructor() {
        this.connection = createConnection({
            user: 'root',
            password: 'rootpassword',
            database: 'pds_mec',
            host: '127.0.0.1'
        });
    }

    async createDriver(driver: Driver) : Promise<string> {
        return new Promise((resolve, reject) => {
            const query = this.connection.query('INSERT INTO User SET ?', driver,
                (err: MysqlError | null, results?: any, fields?: FieldInfo[]) : void => {
                    if(err) reject(err);
                    else resolve(String(results.insertId));
                });
            });
                
    }
}