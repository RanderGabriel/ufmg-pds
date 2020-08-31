const MechanicDatabase = jest.createMockFromModule('../MechanicDatabase')
import { Connection } from "typeorm";

MechanicDatabase.createMechanic = async (data: {
    email: string;
    passwordHash: string;
}, connection: Connection) => {
    const r = await new Promise((resolve, rejects) => {
        resolve()
    })
}

export default MechanicDatabase
