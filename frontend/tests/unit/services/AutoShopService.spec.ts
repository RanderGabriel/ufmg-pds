import AutoShopService from '../../../src/services/AutoShopService'
import AutoShop from '../../../src/models/bussiness/AutoShop'

jest.mock('../../../src/services/HttpService')

const autoShopService = new AutoShopService()

const autoShop = {
    id: 1,
    street: 'Rua Teste',
    streetNumber: 101,
    city: 'Cidade dos testes',
    state: 'Testelandia',
    country: 'Devopolis',
    zipCode: '32713541',
    ableToMove: true,
    mechanicId: 1
}

const anotherAutoShop = {
    id: 2,
    street: 'Rua Teste 2',
    streetNumber: 102,
    city: 'Cidade dos testes',
    state: 'Testelandia',
    country: 'Devopolis',
    zipCode: '32713542',
    ableToMove: true,
    mechanicId: 2
}

describe("AutoShopService", () => {

    test("Get success", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: autoShop
        })

        const response: any = await autoShopService.get(1)
        //Testando o mock
        expect(response.id).toBe(1)
        expect(response.street).toBe('Rua Teste')
        expect(response.streetNumber).toBe(101)
        expect(response.city).toBe('Cidade dos testes')
        expect(response.state).toBe('Testelandia')
        expect(response.country).toBe('Devopolis')
        expect(response.zipCode).toBe('32713541')
        expect(response.ableToMove).toBe(true)
        expect(response.mechanicId).toBe(1)
    })

    test("Get error", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: null
        })

        const response: any = await autoShopService.get(1)
        expect(response).toBe(null)
    })


    test("GetAll", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: [autoShop, anotherAutoShop]
        })

        const response: any = await autoShopService.getAll()
        expect(response[0].id).toBe(1)
        expect(response[0].street).toBe('Rua Teste')

        expect(response[1].id).toBe(2)
        expect(response[1].street).toBe('Rua Teste 2')
    })

    test("Create success", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: autoShop
        })

        const response: any = await autoShopService.create(autoShop as AutoShop)
        expect(response.id).toBe(1)
    })

    test("Create error", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: null
        })

        const response: any = await autoShopService.create(autoShop as AutoShop)
        expect(response).toBe(null)
    })

    test("Update success", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: autoShop
        })

        const response: any = await autoShopService.update(autoShop as AutoShop)
        expect(response.id).toBe(1)
    })

    test("Update error", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: null
        })

        const response: any = await autoShopService.update(autoShop as AutoShop)
        expect(response).toBe(null)
    })

    test("Delete success", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            status: 200,
            data: {
                id: 1
            }
        })

        const response: any = await autoShopService.delete(1)
        expect(response.status).toBe(200)
        expect(response.data.id).toBe(1)

    })

})