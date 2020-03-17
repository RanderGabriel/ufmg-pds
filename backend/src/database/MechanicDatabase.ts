import { Connection } from "typeorm";
import { Mechanic } from "../entity/Mechanic";

export const MechanicDatabase = {
    async createMechanic(data: {
        email: string;
        passwordHash: string;
    }, connection: Connection) {
        const mechanic = new Mechanic();
        mechanic.userEmail = data.email;
        const mechanicRepository = connection.getRepository(Mechanic);
        await mechanicRepository.save(mechanic);
    }
};
