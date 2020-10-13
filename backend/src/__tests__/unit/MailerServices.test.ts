import { mailerService } from "../../services/MailerService";
import { User }from "../../entity";

jest.mock("nodemailer", () => ({
    createTestAccount: jest.fn(() => Promise.resolve({
        user: "testUser",
        password: "testPassword",
    })),
    createTransport: jest.fn(() => ({
        sendMail: jest.fn(),
    })),
    getTestMessageUrl: jest.fn()
}));

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

describe("it should send mailer", () => {
    test("it should send", async () => {
        const mailer = await mailerService.send(testUser);
        console.log(mailer);
        expect(mailer).toEqual(true);

    });
});