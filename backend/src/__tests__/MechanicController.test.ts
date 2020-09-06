import Server from '../../build/App';
import request  = require('supertest');

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")

describe('MechanicController', () => {

    test('POST /api/mechanic/create', async () => {
        const res = await request(Server.app)
            .post('/api/mechanic/create')
            .send({
                user: {
                    email: "teste@123.com",
                    id: 1,
                    name: "teste",
                    passwordHash: "123123",
                    passwordResetExpires: new Date(0),
                    passwordResetToken: "123214234",
                    phoneNumber: "123123123",
                    profile: 1,
                }
            });

            
        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

})