import request  = require('supertest');
const AppTest = require('../../build/App').AppTest;

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")


let app
beforeAll((done) => {
    const appTest = new AppTest()
    appTest.setupTest().then( () => {
        app = appTest.app
        done()
    })
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

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

    test('POST /api/mechanic/create error', async () =>{
        const response = await request(app)
            .post('/api/mechanic/create')
            .send({
                email: "test@test.com",
                password: '123',
            });

        expect(response.status).toBe(200);
        expect(response.body.code).toBe(500);
    });

})