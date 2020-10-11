const AppTest = require('../../build/App').AppTest;
import { solicitationService, driverService, mechanicService} from "../services";
import { Mechanic, Solicitation, Driver, User } from "../entity";
import request  = require('supertest');

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")

const userMechanic: User = {
    id: 100,
    passwordHash: "",
    passwordResetExpires: null,
    passwordResetToken: null,
    email: "userMechanic@test.com",
    name: "Mechanic Test",
    phoneNumber: "31 9999999",
    profile: {
        id: 1,
        name: "MECHANIC",
    },
}

const userDriver: User = {
    id: 101,
    passwordHash: "",
    passwordResetExpires: null,
    passwordResetToken: null,
    email: "userDriver@test.com",
    name: "Driver Test",
    phoneNumber: "31 9999999",
    profile: {
        id: 2,
        name: "DRIVER",
    },
}

const mechanicTest: Mechanic = {
    id: 102,
    user: userMechanic
}

const driverTest: Driver = {
    id: 103,
    user: userDriver
}

const solicitationTest1: Solicitation = {
    id: 104,
    mechanic: mechanicTest,
    driver: driverTest,
    coordinates: "0, 0",
    message: "Me ajuda pelo amor de deus!",
    createdAt: new Date(),
    finishedAt: null
}

const solicitationTest2: Solicitation = {
    id: 105,
    mechanic: mechanicTest,
    driver: driverTest,
    coordinates: "0, 0",
    message: "Me ajuda pelo amor de deus!",
    createdAt: new Date(),
    finishedAt: new Date()
}

let app
beforeAll(async (done) => {
    const appTest = new AppTest();
    appTest.setupTest()
    .then(() => {
        app = appTest.app;
        Promise.all([
            mechanicService.create(mechanicTest), 
            driverService.create(driverTest)]
        ).then(async () => {
            await solicitationService.create(solicitationTest1);
            await solicitationService.create(solicitationTest2);
            done(); 
        })
    })
    .catch(error => {
        console.log(error)
    })
   
})

describe("SolicitationController", () => {
    test("getAll without await", async () => {
        const resp = await request(app)
            .get('api/solicitation/getAll')
        
        expect(resp.body.data.lenght).toEqual(2);
    })
})