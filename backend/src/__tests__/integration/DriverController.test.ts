jest.unmock("typeorm");
import request  = require('supertest');
import {createConnection} from 'typeorm';

let app
beforeAll((done) => {
    createConnection().then((_) => {
        const AppTest = require('../../../build/App').App;
        const appTest = new AppTest();
        app = appTest.app;
        done()
    }).catch(error => {
        console.log(error)
    })
})

describe('DriverController', () => {

    test('POST /api/driver/create', async () => {
        const res = await request(app)
            .post('/api/driver/create')
            .send({
                    email: "motorista@123.com",
                    password: "teste123",
                    name: "teste",
                    phoneNumber: "123123123",
            });

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

    test('POST /api/driver/create error', async () =>{
        const response = await request(app)
            .post('/api/driver/create')
            .send({
                email: "test@test.com",
                password: '123',
            });

        expect(response.status).toBe(200);
        expect(response.body.code).toBe(500);
    });

})

