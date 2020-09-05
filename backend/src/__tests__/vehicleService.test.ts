
import { vehicleService } from "../services/VehicleService";
import { User } from "../entity/User";

jest.mock("../entity/User");
jest.mock("../entity/Vehicle");

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

describe("it should create, read, update and delete vehicles", () => {
    test("it should create", async () => {
        await vehicleService.create({
            color: "Vermelho",
            id: 1,
            licensePlate: "ABC-1234",
            make: "Chevrolet",
            model: "Celta",
            owner: testUser,
            year: 2020
        });
    });
    test("it should delete", async () => {
        await vehicleService.delete(1);
    });
    test("it should read", async () => {
        await vehicleService.get(1);
    });
    test("it should getAll", async () => {
        await vehicleService.getAll();
    });
});