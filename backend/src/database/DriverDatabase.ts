import { Connection } from "typeorm";
import { Driver } from "../entity/Driver";
import { User } from "../entity/User";

export const DriverDatabase = {
    async createDriver(connection: Connection, user: User) {
        const driverRepository = connection.getRepository(Driver);
        const driver = new Driver();
        driver.user = user;
        await driverRepository.save(driver);
    }
};
