import {AppTest} from '../App';
import request  = require('supertest');

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")


let app
beforeAll(async () => {
    const appTest = new AppTest()
    await appTest.setupTest()
    app = appTest.app
})

describe('MechanicController', () => {

    test('POST /api/mechanic/create', async () => {
        const res = await request(app)
            .post('/api/mechanic/create')
            .send({
                    email: "teste@123.com",
                    password: "teste123",
                    name: "teste",
                    phoneNumber: "123123123",
            });
        console.log(res.body)

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

})