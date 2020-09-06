const request = require("supertest");
import {AppTest} from '../App'

let app

beforeAll(async () => {

    const appTest = new AppTest()
    await appTest.setupTest()
    app = appTest.app
    const response = await request(app)
        .post('/api/driver/create')
        .send({
            //Tratativa para não ter e-mails repetidos.
            //O ideal seria zerar um banco de teste a cada
            //nova execução
            email: `test${Date.now()}@test.com.br`,
            password: '123',
            name: "Motorista de teste",
            phoneNumber: "319858233012309"
        });
})


describe('Test mechanic login', () => {

    test('POST /api/mechanic success', async () => {
        const response = await request(app)
            .post('/api/mechanic/create')
            .send({
                email: `test_mec_${Date.now()}@test.com`,
                password: '123',
                name: "Mecânico de teste",
                phoneNumber: "319858233012309"
            });
        expect(response.status).toBe(200);
    });

    test('POST /api/mechanic error', async () =>{
        const response = await request(app)
            .post('/api/mechanic/create')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(200);
        expect(response.body.code).toBe(500);
    });

    test('POST /api/login success', async () => {
        //Cria o usuario (propositalmente ignora erros)
        await request(app)
        .post('/api/driver/create')
        .send({
            email: `test@test.com`,
            password: '123',
            name: "Motorista de teste",
            phoneNumber: "319858233012309"
        });
        const response = await request(app)
            .post('/api/login/create')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(200);
    });

    test('POST /api/login invalid password', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: "test@test.com",
                password: '12',
            });
        expect(response.status).toBe(500);
    });

    test('POST /api/login unknown user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: "test@test.co",
                password: '123',
            });
        expect(response.status).toBe(500);
    })
})