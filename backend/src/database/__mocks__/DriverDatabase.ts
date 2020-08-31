import { Connection } from "typeorm";
import { User } from "../../entity/User";
const DriverDatabase = jest.createMockFromModule('../DriverDatabase')

DriverDatabase.createDriver = async (connection: Connection, user: User) => {
    const r = await new Promise((resolve, rejects) => {
        resolve()
    })
}

export default DriverDatabase