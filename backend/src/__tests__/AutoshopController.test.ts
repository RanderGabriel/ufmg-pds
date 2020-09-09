const AppTest = require('../../build/App').AppTest;
import request  = require('supertest');

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

describe('AutoshopController', () => {
    let createdEntity = null;

    test('POST /api/autoshop/create', async () => {
        const res = await request(app)
            .post('/api/autoshop/create')
            .send({
                mechanic: 1,
                street: 'Rua Belmiro Braga',
                streetNumber: 1034,
                city: 'Belo Horizonte',
                state: 'MG',
                country: 'Brazil',
                ableToMove: true,
                zipCode: 123
            });

            
        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

        createdEntity = res.body.data;
    });

    test('GET /api/autoshop/get', async () => {
        const res = await request(app)
            .get('/api/autoshop/get')
            .query({
                id: createdEntity.id,
            })

        expect(res.status).toEqual(200);

        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('id', createdEntity.id);
        expect(res.body.error).toEqual(null);
    });

    test('GET /api/autoshop/getAll', async () => {
        const res = await request(app)
            .get('/api/autoshop/getAll')

        expect(res.status).toEqual(200);

        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('length');
        expect(res.body.error).toEqual(null);
    });

    test('POST /api/autoshop/update', async () => {
        createdEntity.street = 'Av Antonio Carlos';

        const res = await request(app)
            .post('/api/autoshop/update')
            .send(createdEntity);

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('street', 'Av Antonio Carlos');
        expect(res.body.error).toEqual(null);
    });

    test('GET /api/autoshop/update', async () => {
        const res = await request(app)
            .get('/api/autoshop/delete')
            .query({
                id: createdEntity.id,
            });

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toEqual(createdEntity.id);
        expect(res.body.error).toEqual(null);
    });

});

afterAll(async () => {
    const AutoshopService = require('../../build/services/AutoshopService').default
    const autoshopService = new AutoshopService()
    const autoshops = await autoshopService.getAll()
    autoshops.forEach((autoshop) => {autoshopService.delete(autoshop.id)})
})