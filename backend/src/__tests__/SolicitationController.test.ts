jest.unmock("typeorm");
import "reflect-metadata";
import request = require('supertest');
import { createConnection, getManager } from "typeorm";
import { Mechanic, Solicitation, Driver, User } from "../entity";


let app
beforeAll(async (done) => {
    createConnection().then(() => {
        const userMechanic = new User();
        userMechanic.id = 100;
        userMechanic.passwordHash = "";
        userMechanic.passwordResetExpires =  null;
        userMechanic.passwordResetToken = null;
        userMechanic.email = "userMechanic@test.com";
        userMechanic.name = "Mechanic Test";
        userMechanic.phoneNumber = "31 9999999";
        userMechanic.profile = {
            id: 1,
            name: "MECHANIC",
        };

        const userDriver = new User();
        userDriver.id = 101;
        userDriver.passwordHash = "";
        userDriver.passwordResetExpires = null;
        userDriver.passwordResetToken = null;
        userDriver.email = "userDriver@test.com";
        userDriver.name = "Driver Test";
        userDriver.phoneNumber = "31 9999999";
        userDriver.profile = {
            id: 2,
            name: "DRIVER",
        };

        const mechanicTest = new Mechanic();
        mechanicTest.id = 102;
        mechanicTest.user = userMechanic;

        const driverTest = new Driver();
        driverTest.id = 103;
        driverTest.user = userDriver;

        const solicitationTest1 = new Solicitation();
        solicitationTest1.id = 104;
        solicitationTest1.mechanic = mechanicTest;
        solicitationTest1.driver = driverTest;
        solicitationTest1.coordinates = "0, 0";
        solicitationTest1.message = "Me ajuda pelo amor de deus!";
        solicitationTest1.createdAt = new Date();
        solicitationTest1.finishedAt = null;

        const solicitationTest2 = new Solicitation();
        solicitationTest2.id = 105;
        solicitationTest2.mechanic = mechanicTest;
        solicitationTest2.driver = driverTest;
        solicitationTest2.coordinates = "0, 0";
        solicitationTest2.message = "Me ajuda pelo amor de deus!";
        solicitationTest2.createdAt = new Date();
        solicitationTest2.finishedAt = new Date();


        const AppTest = require('../../build/App').App;
        const appTest = new AppTest();
        app = appTest.app;
        const entityManager = getManager()
        Promise.all([
            entityManager.save(mechanicTest),
            entityManager.save(driverTest)]
            ).then(() => {
                Promise.all([
                    entityManager.save(solicitationTest1),
                    entityManager.save(solicitationTest2)])
                    .then(() => {
                        done();
                    })
                })
    })
    .catch(error => {
        console.log(error)
    });
});


describe("SolicitationController", () => {
    test("getAll without await", async () => {
        const resp = await request(app)
            .get('/api/solicitation/getAll')

        console.log(resp.body.data)
        expect(resp.body.data.length).toEqual(2);
    })
})