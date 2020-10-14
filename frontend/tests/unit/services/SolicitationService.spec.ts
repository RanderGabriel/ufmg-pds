import SolicitationService, { solicitationService } from '../../../src/services/SolicitationService'
import Solcitation from '../../../src/models/bussiness/Solicitation'

jest.mock('../../../src/services/HttpService')


const userService = new SolicitationService()
const solicitation_1 = {
    id: 1,
    message: "HELP!",
    driver: 1,
    mechanic: 1,
    createAt: Date(),
    acceptedAt: Date(),
    refusedAt: Date(),
    finishedAt: Date(),
    coordinates: "(0,0)"
}

const solicitation_2 = {
    id: 2,
    message: "HELP ME!",
    driver: 2,
    mechanic: 2,
    createAt: Date(),
    acceptedAt: Date(),
    refusedAt: Date(),
    finishedAt: Date(),
    coordinates: "(0,0)"
}

describe("SolicitationService", () => {
    
    test("create", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: {...solicitation_1}
        })
        const response = await solicitationService.create("HELP!");
        
        expect((response as Solcitation).message).toEqual("HELP!");
        expect((response as Solcitation).id).toEqual(1);
    })

    test("accept", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({})
        const response = await solicitationService.accept(1);
        
        expect(response).toEqual(true)
    })

    test("getAll", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: [solicitation_1, solicitation_2]
        })
        const response = await solicitationService.getAll();
        console.log(response)
        expect(response.data.length).toEqual(2)
    })

    test("actives", async () => {
        require('../../../src/services/HttpService').httpService.__setGetResponse({
            data: [solicitation_1, solicitation_2]
        })
        const response = await solicitationService.getAll();
        console.log(response)
        expect(response.data.length).toEqual(2)
    })

    test("cancel", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({})
        const response = await solicitationService.cancel(1);
        
        expect(response).toEqual(true)
    })

    test("start", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({})
        const response = await solicitationService.start(1);
        
        expect(response).toEqual(true)
    })

    test("finish", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({})
        const response = await solicitationService.finish(1);
        
        expect(response).toEqual(true)
    })

    
    
})
