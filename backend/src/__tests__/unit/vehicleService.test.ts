
import VehiclesService, { vehicleService } from "../../services/VehicleService";
import { User } from "../../entity";
import { getRepository } from "../../../__mocks__/typeorm";

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

const testVehicle = {
    color: "Vermelho",
    id: 1,
    licensePlate: "ABC-1234",
    make: "Chevrolet",
    model: "Celta",
    owner: testUser,
    year: 2020
};

describe("it should create, read, update and delete vehicles", () => {

    test("it should create", async () => {
        const vehicle = await vehicleService.create(testVehicle);

        expect(vehicle.id).toEqual(1);
    });

    test("it should delete", async () => {
        await vehicleService.delete(1);
    });

    test("it should read", async () => {
        // @ts-ignore
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testVehicle),
        });
        const vehicleServiceMock = new VehiclesService()
        const vehicle = await vehicleServiceMock.get(1);
        expect(vehicle.id).toEqual(1);
    });

    test("it should getAll", async () => {
        getRepository.mockReturnValueOnce({
            findOne : () => Promise.resolve(testVehicle),
            find: () => Promise.resolve([testVehicle])
        });
        const vehicleServiceMock = new VehiclesService()
        const vehicles = await vehicleServiceMock.getAll();
        expect(
            vehicles.filter(v => v.id === testVehicle.id).length
            ).toEqual(1);
    });

    test("it should throw errors", async () => {
        getRepository.mockReturnValue({
            findOne : () => Promise.reject(),
            find: () => Promise.reject(),
            save: () => Promise.reject(),
        });
        const vehicleServiceMock = new VehiclesService()
        const fn = jest.fn();
        const promises = [
            vehicleServiceMock.create(testVehicle).catch(fn),
            vehicleServiceMock.get(1).catch(fn),
            vehicleServiceMock.getAll().catch(fn),
            vehicleServiceMock.update(testVehicle).catch(fn),
            vehicleServiceMock.delete(1).catch(fn),
        ];
        await Promise.all(promises);
        expect(fn).toBeCalledTimes(5);
    });
});