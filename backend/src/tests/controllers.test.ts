const request = require("supertest");
const application =  require('../App');

test('Post /api/driver', async done =>{
    const response = await request(application.app)
        .post('/api/driver')
        .send({
            email: "test@test.com.br",
            password: '123',
        })
    expect(response.statusCode).toBe(200);
});