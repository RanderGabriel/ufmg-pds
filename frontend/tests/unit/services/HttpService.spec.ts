import HttpService from '../../../src/services/HttpService'
import axios from 'axios'

jest.unmock('../../../src/services/HttpService')
jest.mock('axios')

const httpService = new HttpService()
describe("HttpService",  () => {
    test('GET', async () => {
        
        (axios.get as any).mockResolvedValue({
            data: {
                teste: 'teste'
            }
        })
        const response = await httpService.get('test')
        expect(response.teste).toBe('teste')
    })

    test('POST', async() => {
        (axios.post as any).mockResolvedValue({
            data: {
                teste: 'teste'
            }
        })   

        const response = await httpService.get('test')
        expect(response.teste).toBe('teste')
    })
})