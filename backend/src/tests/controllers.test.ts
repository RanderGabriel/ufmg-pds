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