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
        await accessService.create(testAccess);
    });

    test("it should delete", async () => {
        await accessService.delete(1);
    });
    test("it should read", async () => {
        await accessService.get(1);
    });
    test("it should getAll", async () => {
        await accessService.getAll();
    });
});