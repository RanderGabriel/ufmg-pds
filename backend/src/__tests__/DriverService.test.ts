import { driverService } from "../services/DriverService";
import {Driver, User }from "../entity";
import { getConnection } from "../../__mocks__/typeorm";

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

const driverTest: Driver = {
    id: 1,
    user: testUser
}

describe("it should create, read, update and delete vehicles", () => {
    test("it should create", async () => {
        const driver = await driverService.create(driverTest);

        expect(driver).toEqual(driverTest);
    });

    test("it should delete", async () => {
        await driverService.delete(1);
    });
    test("it should read", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(driverTest),
                find: () => Promise.resolve([driverTest]),
                save: (param) => Promise.resolve(param),
            })
        });
        const driver = await driverService.get(1);
        expect(driver).toEqual(driverTest);
    });
    test("it should getAll", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(driverTest),
                find: () => Promise.resolve([driverTest]),
                save: (param) => Promise.resolve(param),
            })
        });
        const drivers = await driverService.getAll();

        expect(drivers.filter(a => a.id === 1).length).toEqual(1);
        expect(drivers.find(a => a.id === 1)).toEqual(driverTest);
    });
    test("it should update", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(driverTest),
                find: () => Promise.resolve([driverTest]),
                save: (param) => Promise.resolve(param),
            })
        });

        const driver = await driverService.create(driverTest);
        driver.user.phoneNumber = "31123123123";
        const updatedUser = await driverService.update(driver);
        expect(updatedUser.user.phoneNumber).toEqual("31123123123");
    });

    test("it should throw errors", async () => {
        getConnection.mockReturnValue({
            getRepository: () => ({
                findOne : () => Promise.reject(),
                find: () => Promise.reject(),
                save: () => Promise.reject(),
            })
        });
        const fn = jest.fn();
        const promises = [
            driverService.create(driverTest).catch(fn),
            driverService.get(1).catch(fn),
            driverService.getAll().catch(fn),
            driverService.update(driverTest).catch(fn),
            driverService.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});