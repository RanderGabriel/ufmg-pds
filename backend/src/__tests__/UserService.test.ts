import { userService } from "../services/UserService";
import { User } from "../entity";
import { getConnection } from "../../__mocks__/typeorm";


// Criar Usuário de perfil "Motorista"
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

describe("it should create, read, update and delete user", () => {
    test("it should create", async () => {
        const user = await userService.create(testUser);

        expect(user.id).toEqual(1);
    });
    test("it should delete", async () => {
        await userService.delete(1);
    });
    test("it should read", async () => {
        // @ts-ignore
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testUser),
            })
        });

        const user = await userService.get(1);
        expect(user.id).toEqual(1);
    });
    test("it should getAll", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testUser),
                find: () => Promise.resolve([testUser])
            })
        });

        const users = await userService.getAll();
        expect(
            users.filter(v => v.id === testUser.id).length
            ).toEqual(1);
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
            userService.create(testUser).catch(fn),
            userService.get(1).catch(fn),
            userService.getAll().catch(fn),
            userService.update(testUser).catch(fn),
            userService.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});

