import { autoshopService } from "../services/AutoshopService";
import { User, Mechanic, Autoshop } from "../entity";
import { getConnection } from "../../__mocks__/typeorm";


// Criar Usuário de perfil "Mecânico"
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
        id: 2
    },
};

// Criar mecânico
const testMechanic: Mechanic = {
    id: 1,
    user: testUser
}

// Vincular Oficina ao mecânico
const testAutoshop: Autoshop = {
    id: 1,
    mechanic: testMechanic,
    ableToMove: true,
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brazil',
    street: 'Rua Belmiro Braga',
    streetNumber: 1034,
    zipCode: '30720-520'    
}

describe("it should create, read, update and delete autoshops", () => {
    test("it should create", async () => {
        const autoshop = await autoshopService.create(testAutoshop);

        expect(autoshop.id).toEqual(1);
    });
    test("it should delete", async () => {
        await autoshopService.delete(1);
    });
    test("it should read", async () => {
        // @ts-ignore
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAutoshop),
            })
        });

        const autoshop = await autoshopService.get(1);
        expect(autoshop.id).toEqual(1);
    });
    test("it should getAll", async () => {
        getConnection.mockReturnValueOnce({
            getRepository: () => ({
                findOne : () => Promise.resolve(testAutoshop),
                find: () => Promise.resolve([testAutoshop])
            })
        });

        const autoshops = await autoshopService.getAll();
        expect(
            autoshops.filter(v => v.id === testAutoshop.id).length
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
            autoshopService.create(testAutoshop).catch(fn),
            autoshopService.get(1).catch(fn),
            autoshopService.getAll().catch(fn),
            autoshopService.update(testAutoshop).catch(fn),
            autoshopService.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);

    });
});

