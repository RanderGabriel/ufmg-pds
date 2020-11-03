jest.unmock("typeorm");
import "reflect-metadata";
import request = require('supertest');
import { createConnection, getManager } from "typeorm";
import { Mechanic, Solicitation, Driver, User, Access } from "../../../src/entity";

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

        const solicitationTest3 = new Solicitation();
        solicitationTest3.id = 106;
        solicitationTest3.driver = driverTest;
        solicitationTest3.coordinates = "0, 0";
        solicitationTest3.message = "Meu carro quebrou";
        solicitationTest3.createdAt = new Date();

        const driverAccess = new Access();
        driverAccess.user = userDriver;
        driverAccess.userToken = "DRIVER_TOKEN";

        const mechanicAccess = new Access();
        mechanicAccess.user = userMechanic;
        mechanicAccess.userToken = "MECHANIC_TOKEN";

        const AppTest = require('../../../src/App').App;
        const appTest = new AppTest();
        appTest.configureSocket();
        app = appTest.app;
        const entityManager = getManager()
        
        Promise.all([
            entityManager.save(mechanicTest),
            entityManager.save(driverTest)]
            ).then(() => {
                Promise.all([
                    entityManager.save(solicitationTest1),
                    entityManager.save(solicitationTest2),
                    entityManager.save(solicitationTest3)])
                    .then(() =>
                        Promise.all([
                            entityManager.save(mechanicAccess),
                            entityManager.save(driverAccess)]))
                    .then(() => {
                        done();
                    })
                })
    })
    .catch(error => {
        console.log(error)
    });
});


describe("SolicitationController - GET ALL", () => {
    test("getAll without await", async () => {
        const resp = await request(app)
            .get('/api/solicitation/getAll')

        expect(resp.body.data.length).toEqual(3);
    })

    test("GET Actives", async () => {
        const resp = await request(app)
            .get('/api/solicitation/actives')

        expect(resp.body.data.length).toEqual(1);
        expect(resp.body.data[0].id).toEqual(106);
    })

    test("GET Actives", async () => {
        const resp = await request(app)
            .get('/api/solicitation/actives')

        expect(resp.body.data.length).toEqual(1);
        expect(resp.body.data[0].id).toEqual(106);
    })

    test("CREATE", async () => {
        const resp = await request(app)
            .post('/api/solicitation/create')
            .set("authorization", "DRIVER_TOKEN")
            .send({
                message: "Mensagem de teste"
            });
        expect(resp.status).toEqual(200);
        expect(resp.body.code).toEqual(200);
        
        const resp2 = await request(app)
        .post('/api/solicitation/create')
        .set("authorization", "MECHANIC_TOKEN")
        .send({
            message: "Mensagem de teste"
        });

        expect(resp2.status).toEqual(500);
        expect(resp2.body.code).toEqual(500);
    })

    test("ACCEPT", async () => {
        const resp = await request(app)
            .post('/api/solicitation/accept')
            .set("authorization", "MECHANIC_TOKEN")
            .send({
                id: 106
            });
        expect(resp.status).toEqual(200);
        expect(resp.body.code).toEqual(200);
        
        const resp2 = await request(app)
        .post('/api/solicitation/accept')
        .set("authorization", "DRIVER_TOKEN")
        .send({
            id: 106
        });

        expect(resp2.status).toEqual(500);
        expect(resp2.body.code).toEqual(500);

        const resp3 = await request(app)
        .post('/api/solicitation/accept')
        .set("authorization", "MECHANIC_TOKEN")
        .send({
            id: 105
        });

        expect(resp3.status).toEqual(500);
        expect(resp3.body.code).toEqual(500);
    })

    test("START", async () => {
        const resp = await request(app)
            .post('/api/solicitation/start')
            .set("authorization", "DRIVER_TOKEN")
            .send({
                id: 106
            });
            
        expect(resp.body.code).toEqual(200);
        expect(resp.status).toEqual(200);
        
        const resp2 = await request(app)
        .post('/api/solicitation/start')
        .set("authorization", "MECHANIC_TOKEN")
        .send({
            id: 106
        });
        expect(resp2.body.code).toEqual(500);
        expect(resp2.status).toEqual(500);
    })

    test("CANCEL", async () => {
        const resp = await request(app)
            .post('/api/solicitation/cancel')
            .set("authorization", "DRIVER_TOKEN")
            .send({
                id: 106
            });
            
        expect(resp.body.code).toEqual(200);
        expect(resp.status).toEqual(200);
        
        const resp2 = await request(app)
        .post('/api/solicitation/cancel')
        .set("authorization", "MECHANIC_TOKEN")
        .send({
            id: 106
        });
        expect(resp2.body.code).toEqual(500);
        expect(resp2.status).toEqual(500);

    })

})