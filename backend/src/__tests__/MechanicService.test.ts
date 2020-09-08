import { mechanicService } from "../services/MechanicService";
import {Mechanic, User }from "../entity";
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
        name: "MECHANIC",
        id: 1
    },
};

const mechanicTest: Mechanic = {
    id: 1,
    user: testUser
}

describe("it should create, read, update and delete vehicles", () => {
    test("it should create", async () => {
        const mechanic = await mechanicService.create(mechanicTest);
        expect(mechanic).toEqual(mechanicTest);

    });

    test("it should delete", async () => {
        await mechanicService.delete(1);
    });
    test("it should read", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(mechanicTest),
            })
        });
        const mechanic = await mechanicService.get(1);
        expect(mechanic).toEqual(mechanicTest);
    });
    test("it should getAll", async () => {
        // @ts-ignore
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(mechanicTest),
                find: () => Promise.resolve([mechanicTest])
            })
        });
        const mechanics = await mechanicService.getAll();
        expect(mechanics.filter(a => a.id === 1).length).toEqual(1);
        expect(mechanics.find(a => a.id === 1)).toEqual(mechanicTest);
    });

    test("it should update", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(mechanicTest),
                find: () => Promise.resolve([mechanicTest]),
                save: (param) => Promise.resolve(param),
            })
        });

        const mechanic = await mechanicService.create(mechanicTest);
        mechanic.user.phoneNumber = "3132190123";
        const updatedMechanic = await mechanicService.update(mechanic);
        expect(updatedMechanic.user.phoneNumber).toEqual("3132190123");
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
            mechanicService.create(mechanicTest).catch(fn),
            mechanicService.get(1).catch(fn),
            mechanicService.getAll().catch(fn),
            mechanicService.update(mechanicTest).catch(fn),
            mechanicService.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});