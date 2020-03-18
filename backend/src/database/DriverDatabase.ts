import { Connection } from "typeorm";
import { Driver } from "../entity/Driver";

export const DriverDatabase = {
    async createDriver(connection: Connection, email: string) {
        const driverRepository = connection.getRepository(Driver);
        const driver = new Driver();
        driver.userEmail = email;
        await driverRepository.save(driver);
    }
};