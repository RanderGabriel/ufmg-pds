
jest.unmock("typeorm");
import request  = require('supertest');
import { createConnection, getRepository} from 'typeorm'
import { User } from '../../../src/entity';


let app
let repository
beforeAll((done) => {
    createConnection().then( () => {
        
        const AppTest = require('../../../src/App').App;
        const appTest = new AppTest()
        app = appTest.app
        repository = getRepository(User);
        done()
    })
})

describe('UserController', () => {

    test('POST /api/user/create', async () => {
        const now: Date = new Date();
        now.setHours(now.getHours() + 1)
        const res = await request(app)
            .post('/api/user/create')
            .send({
                    email: "reset@123.com",
                    password: "123456",
                    passwordHash: "$2b$10$cIGTfUIr4I2mPOoFA0dn..b9W0ap0FEI4wYgC.pW5SgKMyd2aZ1vK",
                    passwordResetToken: "29342766fd627646dff66b917f5a7728896b0484",
                    passwordResetExpires: now,
                    name: "reset teste",
                    phoneNumber: "123123123",
                    profileId: 1,
                    profile: "MECHANIC"
            });

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

    test('POST /api/user/forgot-password', async () => {
        const res = await request(app)
            .post('/api/user/forgot-password')
            .send({
                    email: "reset@123.com",
            });

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

    test('POST /api/user/reset-password', async () => {
        const { passwordResetToken } = await repository.findOne({
            email: "reset@123.com"
        });
        expect(passwordResetToken).toBeTruthy();

        const res = await request(app)
            .post('/api/user/reset-password')
            .send({
                    email: "reset@123.com",
                    password: "teste",
                    passwordConfirmation: "teste",
                    passwordResetToken,
            });
        
        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

    });

})

