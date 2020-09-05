import { Connection } from "typeorm";
import { Mechanic } from "../entity";
import { UserDatabase } from "./UserDatabase";

export const MechanicDatabase = {
    async createMechanic(data: {
        email: string;
        passwordHash: string;
    }, connection: Connection) {
        const user = await UserDatabase.getUser(connection, data.email);
        const mechanic = new Mechanic();
        mechanic.user = user;
        const mechanicRepository = connection.getRepository(Mechanic);
        await mechanicRepository.save(mechanic);
    }
};
