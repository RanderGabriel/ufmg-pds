const request = require("supertest");
const application = require('../App').default;

beforeAll(async () => {
    const response = await request(application.app)
        .post('/api/driver')
        .send({
            //Tratativa para não ter e-mails repetidos.
            //O ideal seria zerar um banco de teste a cada
            //nova execução
            email: `test${Date.now()}@test.com.br`,
            password: '123',
            name: "Motorista de teste",
            phoneNumber: "319858233012309"
        });
    expect(response.status).toBe(200);
})


describe('Test mechanic login', () => {

    test('POST /api/mechanic success', async () => {
        const response = await request(application.app)
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
        const response = await request(application.app)
            .post('/api/mechanic/create')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(500);
    });

    test('POST /api/login success', async () => {
        //Cria o usuario (propositalmente ignora erros)
        await request(application.app)
        .post('/api/driver')
        .send({
            email: `test@test.com`,
            password: '123',
            name: "Motorista de teste",
            phoneNumber: "319858233012309"
        });
        const response = await request(application.app)
            .post('/api/login')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(200);
    });

    test('POST /api/login invalid password', async () => {
        const response = await request(application.app)
            .post('/api/login')
            .send({
                email: "test@test.com",
                password: '12',
            });
        expect(response.status).toBe(500);
    });

    test('POST /api/login unknown user', async () => {
        const response = await request(application.app)
            .post('/api/login')
            .send({
                email: "test@test.co",
                password: '123',
            });
        expect(response.status).toBe(500);
    })
})