import { driverService } from "../services/DriverService";
import {Driver, User }from "../entity";

const testUser: User = {
    email: "teste@123.com",
    id: 1,
    name: "teste",
    passwordHash: "123123",
    passwordResetExpires: new Date(0),
    passwordResetToken: "123214234",
    phoneNumber: "123123123",
    profile: {
        name: "driver",
        id: 1
    },
};

const mechanicTest: Driver = {
    id: 1,
    user: testUser
}

describe("it should create, read, update and delete vehicles", () => {
    test("it should create", async () => {
        await driverService.create(mechanicTest);
    });

    test("it should delete", async () => {
        await driverService.delete(1);
    });
    test("it should read", async () => {
        await driverService.get(1);
    });
    test("it should getAll", async () => {
        await driverService.getAll();
    });
});