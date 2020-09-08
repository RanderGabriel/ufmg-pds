import * as bcrypt from "bcrypt";
import { generateSaltedPassword } from "../utils";

jest.mock("bcrypt", () => ({
    genSalt: jest.fn(),
    hash: jest.fn()
}));

test("it should create salted hash", async () => {
    // @ts-ignore
    bcrypt.genSalt.mockImplementation((_, cb) => cb(null, "salt"));
    // @ts-ignore
    bcrypt.hash.mockImplementation((pass, salt, cb) => cb(null, "hash"));

    const saltedHash = await generateSaltedPassword("password");

    expect(saltedHash).toEqual("hash");
});

test("it should throw error", async () => {
    // @ts-ignore
    bcrypt.genSalt.mockImplementation((_, cb) => cb("error"));
    const fn = jest.fn();
    await generateSaltedPassword("password").catch(fn);

    // @ts-ignore
    bcrypt.genSalt.mockImplementation((_, cb) => cb(null, "salt"));
    // @ts-ignore
    bcrypt.hash.mockImplementation((pass, salt, cb) => cb("error"));
    await generateSaltedPassword("password").catch(fn);

    expect(fn).toBeCalledTimes(2);
});