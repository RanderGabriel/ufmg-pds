import VehicleService from '../../../src/services/VehicleService'
import Vehicle from '../../../src/models/bussiness/Vehicle'

jest.mock('../../../src/services/HttpService')

const vehicleService = new VehicleService()
const vehicle = {
    id: 1,
    make: 'TestFactory',
    model: 'Test',
    year: '2030',
    licensePlate: 'TES1010',
    color: 'silver',
    ownerId: 1
}

const anotherVehicle = {
    id: 2,
    make: 'TestFactory',
    model: 'Test',
    year: '2030',
    licensePlate: 'TES1011',
    color: 'ruby',
    ownerId: 2
}

describe("VehicleService", () => {

    test("Get success", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: vehicle
        })

        const response: any = await vehicleService.get(1)
        //Testando o mock
        expect(response.id).toBe(1)
        expect(response.make).toBe('TestFactory')
        expect(response.year).toBe('2030')
        expect(response.licensePlate).toBe('TES1010')
        expect(response.color).toBe('silver')
        expect(response.ownerId).toBe(1)
    })

    test("Get error", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: null
        })

        const response: any = await vehicleService.get(1)
        expect(response).toBe(null)
    })


    test("GetAll", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: [vehicle, anotherVehicle]
        })

        const response: any = await vehicleService.getAll()
        expect(response[0].id).toBe(1)
        expect(response[0].licensePlate).toBe('TES1010')

        expect(response[1].id).toBe(2)
        expect(response[1].licensePlate).toBe('TES1011')
    })

    test("Create success", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: vehicle
        })

        const response: any = await vehicleService.create(vehicle as Vehicle)
        expect(response.id).toBe(1)
    })

    test("Create error", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: null
        })

        const response: any = await vehicleService.create(vehicle as Vehicle)
        expect(response).toBe(null)
    })

    test("Update success", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: vehicle
        })

        const response: any = await vehicleService.update(vehicle as Vehicle)
        expect(response.id).toBe(1)
    })

    test("Update error", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: null
        })

        const response: any = await vehicleService.update(vehicle as Vehicle)
        expect(response).toBe(null)
    })

    test("Delete success", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            status: 200,
            data: {
                id: 1
            }
        })

        const response: any = await vehicleService.delete(1)
        expect(response.status).toBe(200)
        expect(response.data.id).toBe(1)

    })

})

