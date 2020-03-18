const request = require("supertest");
const application =  require('../App').default;

afterAll(() => {
    application.server.close();
});

test('Post /api/driver', async () =>{;
    const response = await request(application.server)
        .post('/api/driver')
        .send({
            email: "test@test.com.br",
            password: '123',
        });
    expect(response.status).toBe(200);
});

describe('Test mechanic login', () => {

    test('POST /api/mechanic success', async () =>{;
        const response = await request(application.server)
            .post('/api/mechanic')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(200);
    });

    
    test('POST /api/mechanic error', async () =>{;
        const response = await request(application.server)
            .post('/api/mechanic')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(500);
    });

    test('POST /api/login success', async () => {
        const response = await request(application.server)
            .post('/api/login')
            .send({
                email: "test@test.com",
                password: '123',
            });
        expect(response.status).toBe(200);
    });

    test('POST /api/login invalid password', async () => {
        const response = await request(application.server)
            .post('/api/login')
            .send({
                email: "test@test.com",
                password: '12',
            });
        expect(response.status).toBe(500);
    });

    test('POST /api/login unknown user', async () => {
        const response = await request(application.server)
            .post('/api/login')
            .send({
                email: "test@test.co",
                password: '123',
            });
        expect(response.status).toBe(500);
    })
})