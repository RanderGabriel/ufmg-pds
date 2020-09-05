import Server from '../../build/App';
import request  = require('supertest');

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")

describe('VehicleController', () => {
    let createdEntity = null;

    test('POST /api/vehicle/create', async () => {
        const res = await request(Server.app)
            .post('/api/vehicle/create')
            .send({
                make: 'Volkswagen',
                model: 'Fox',
                year: 2020,
                color: 'Vermelho',
                licensePlate: 'XXX-1234',
                ownerId: 1,
            });

            
        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.error).toEqual(null);

        createdEntity = res.body.data;
    });

    test('GET /api/vehicle/get', async () => {
        const res = await request(Server.app)
            .get('/api/vehicle/get')
            .query({
                id: createdEntity.id,
            })

        expect(res.status).toEqual(200);

        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('id', createdEntity.id);
        expect(res.body.error).toEqual(null);
    });

    test('GET /api/vehicle/getAll', async () => {
        const res = await request(Server.app)
            .get('/api/vehicle/getAll')

        expect(res.status).toEqual(200);

        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('length');
        expect(res.body.error).toEqual(null);
    });

    test('POST /api/vehicle/update', async () => {
        createdEntity.model = 'Gol';

        const res = await request(Server.app)
            .post('/api/vehicle/update')
            .send(createdEntity);

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toHaveProperty('model', 'Gol');
        expect(res.body.error).toEqual(null);
    });

    test('GET /api/vehicle/update', async () => {
        const res = await request(Server.app)
            .get('/api/vehicle/delete')
            .query({
                id: createdEntity.id,
            });

        expect(res.status).toEqual(200);
        expect(res.body.code).toEqual(200);
        expect(res.body.data).toEqual(createdEntity.id);
        expect(res.body.error).toEqual(null);
    });

});