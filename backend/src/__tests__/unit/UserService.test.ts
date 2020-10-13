import UserService, { userService } from "../../services/UserService";
import { User } from "../../entity";
import { getRepository } from "../../../__mocks__/typeorm";

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
        getRepository.mockReturnValueOnce({
           findOne : () => Promise.resolve(testUser),
        });
            const userServiceMock = new UserService()
        const user = await userServiceMock.get(1);
        expect(user.id).toEqual(1);
    });
    test("it should getAll", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testUser),
            find: () => Promise.resolve([testUser])   
        });
        const userServiceMock = new UserService();
        const users = await userServiceMock.getAll();
        expect(
            users.filter(v => v.id === testUser.id).length
            ).toEqual(1);
    });
    test("it should throw errors", async () => {
        getRepository.mockReturnValue({
            findOne : () => Promise.reject(),
            find: () => Promise.reject(),
            save: () => Promise.reject(), 
        });
        const userServiceMock = new UserService()
        const fn = jest.fn();
        const promises = [
            userServiceMock.create(testUser).catch(fn),
            userServiceMock.get(1).catch(fn),
            userServiceMock.getAll().catch(fn),
            userServiceMock.update(testUser).catch(fn),
            userServiceMock.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});

