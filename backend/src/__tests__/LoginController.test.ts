const request = require("supertest");
const AppTest = require('../../build/App').AppTest;
const express = require('express')

jest.unmock("typeorm");
jest.unmock("../services/DatabaseService")

let app
beforeAll((done) => {

    const appTest = new AppTest()
    appTest.setupTest().then( () => {
        app = appTest.app
        request(app)
        .post('/api/driver/create')
        .send({
            email: 'test@test.com',
            password: '123',
            name: "Motorista de teste",
            phoneNumber: "319858233012309"
        })
        .then(() =>{ 
            done()
        });
    })

})

describe('Test mechanic login', () => {

    test('POST /api/login success', async () => {
        //Cria o usuario (propositalmente ignora erros)
       
        const response = await request(app)
            .post('/api/login')
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

