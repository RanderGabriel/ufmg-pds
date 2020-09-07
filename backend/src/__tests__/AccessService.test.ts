import { accessService } from "../services/AccessService";
import { User, Access }from "../entity";
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
        name: "DRIVER",
        id: 1
    },
};

const testAccess: Access = {
    id: 1,
    user: testUser,
    userToken: "aasd23lkasdclk1-3opasdk"
};


describe("it should create, read, update and delete accesses", () => {
    test("it should create", async () => {
        const access = await accessService.create(testAccess);
        expect(access).toEqual(testAccess);
    });

    test("it should delete", async () => {
        await accessService.delete(1);
    });
    test("it should read", async () => {
        // @ts-ignore
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAccess),
            })
        });
        const access = await accessService.get(1);
        expect(access).toEqual(access);
    });
    test("it should getAll", async () => {
        // @ts-ignore
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAccess),
                find: () => Promise.resolve([testAccess])
            })
        });
        const accesses = await accessService.getAll();
        expect(accesses.filter(a => a.id === 1).length).toEqual(1);
        expect(accesses.find(a => a.id === 1)).toEqual(testAccess);
    });
});