import AcessService, { accessService } from "../services/AccessService";
import { User, Access }from "../entity";
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
        getRepository.mockReturnValueOnce({
           findOne : () => Promise.resolve(testAccess),
        });
        const accessServiceMock =  new AcessService();
        const access = await accessServiceMock.get(1);
        expect(access).toEqual(access);
    });

    test("it should getAll", async () => {
        // @ts-ignore
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testAccess),
            find: () => Promise.resolve([testAccess])
        });
        const accessServiceMock =  new AcessService();
        const accesses = await accessServiceMock.getAll();
        expect(accesses.filter(a => a.id === 1).length).toEqual(1);
        expect(accesses.find(a => a.id === 1)).toEqual(testAccess);
    });

    test("it should get by token", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testAccess),
            find: () => Promise.resolve([testAccess])
        });
        const accessServiceMock =  new AcessService();
        const access = await accessServiceMock.getByToken("aasd23lkasdclk1-3opasdk");
        expect(access).toEqual(testAccess);
    });

    test("it should update", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testAccess),
            find: () => Promise.resolve([testAccess]),
            save: (param) => Promise.resolve(param),
        });
        const accessServiceMock =  new AcessService();
        const access = await accessServiceMock.create(testAccess);
        access.userToken = "asdplas16a3sd1fmsdf";
        const updatedAcces = await accessServiceMock.update(access);
        expect(updatedAcces.userToken).toEqual("asdplas16a3sd1fmsdf");
    });

    test("it should throw errors", async () => {
        getRepository.mockReturnValue({
            findOne : () => Promise.reject(),
            find: () => Promise.reject(),
            save: () => Promise.reject(),
        });

        const accessServiceMock =  new AcessService();
        const fn = jest.fn();
        const promises = [
            accessServiceMock.create(testAccess).catch(fn),
            accessServiceMock.get(1).catch(fn),
            accessServiceMock.getAll().catch(fn),
            accessServiceMock.update(testAccess).catch(fn),
            accessServiceMock.delete(1).catch(fn),
            accessServiceMock.getByToken("1").catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(6);
    });
});