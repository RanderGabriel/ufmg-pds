import { accessService } from "../services/AccessService";
import { User, Access }from "../entity";

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

    test("it should get by token", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAccess),
                find: () => Promise.resolve([testAccess])
            })
        });

        const access = await accessService.getByToken("aasd23lkasdclk1-3opasdk");
        expect(access).toEqual(testAccess);
    });

    test("it should update", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAccess),
                find: () => Promise.resolve([testAccess]),
                save: (param) => Promise.resolve(param),
            })
        });

        const access = await accessService.create(testAccess);
        access.userToken = "asdplas16a3sd1fmsdf";
        const updatedAcces = await accessService.update(access);
        expect(updatedAcces.userToken).toEqual("asdplas16a3sd1fmsdf");
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
            accessService.create(testAccess).catch(fn),
            accessService.get(1).catch(fn),
            accessService.getAll().catch(fn),
            accessService.update(testAccess).catch(fn),
            accessService.delete(1).catch(fn),
            accessService.getByToken("1").catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(6);

    });
});