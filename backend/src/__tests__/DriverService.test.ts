import DriverService, { driverService } from "../services/DriverService";
import {Driver, User }from "../entity";
import { getRepository } from "../../__mocks__/typeorm";

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
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(driverTest),
            find: () => Promise.resolve([driverTest]),
            save: (param) => Promise.resolve(param),
        });
        const driverServiceMock = new DriverService();
        const driver = await driverServiceMock.get(1);
        expect(driver).toEqual(driverTest);
    });
    test("it should getAll", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(driverTest),
            find: () => Promise.resolve([driverTest]),
            save: (param) => Promise.resolve(param),
        });
        const driverServiceMock = new DriverService();
        const drivers = await  driverServiceMock.getAll();

        expect(drivers.filter(a => a.id === 1).length).toEqual(1);
        expect(drivers.find(a => a.id === 1)).toEqual(driverTest);
    });
    test("it should update", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(driverTest),
            find: () => Promise.resolve([driverTest]),
            save: (param) => Promise.resolve(param),
        });

        const driverServiceMock = new DriverService();
        const driver = await driverServiceMock.create(driverTest);
        driver.user.phoneNumber = "31123123123";
        const updatedUser = await driverServiceMock.update(driver);
        expect(updatedUser.user.phoneNumber).toEqual("31123123123");
    });

    test("it should throw errors", async () => {
        getRepository.mockReturnValue({
            findOne : () => Promise.reject(),
            find: () => Promise.reject(),
            save: () => Promise.reject(),
        });
        const driverServiceMock = new DriverService();
        const fn = jest.fn();
        const promises = [
            driverServiceMock.create(driverTest).catch(fn),
            driverServiceMock.get(1).catch(fn),
            driverServiceMock.getAll().catch(fn),
            driverServiceMock.update(driverTest).catch(fn),
            driverServiceMock.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});