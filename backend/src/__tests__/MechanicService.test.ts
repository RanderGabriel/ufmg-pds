import { mechanicService } from "../services/MechanicService";
import { User } from "../entity/User";
import { Mechanic } from "../entity";

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
        await mechanicService.create(mechanicTest);
    });

    test("it should delete", async () => {
        await mechanicService.delete(1);
    });
    test("it should read", async () => {
        await mechanicService.get(1);
    });
    test("it should getAll", async () => {
        await mechanicService.getAll();
    });
});