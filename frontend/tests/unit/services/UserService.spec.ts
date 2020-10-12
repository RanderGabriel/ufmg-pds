import UserService from '../../../src/services/UserService'
import User from '../../../src/models/bussiness/User'

jest.mock('../../../src/services/HttpService')

const userService = new UserService()
const user: User = {
    id: '1',
    email: 'test@test.com',
    password: 'test123',
    passwordConfirmation: 'test123',
    passwordResetToken: 'token',
    profile: 'DRIVER',
    token: 'anotherToken',
    phoneNumber: '3199999999',
    name: 'Teste',
}

const anotherUser = {
    id: '1',
    email: 'test2@test.com',
    password: 'test123',
    passwordConfirmation: 'test123',
    passwordResetToken: 'token',
    profile: 'DRIVER',
    token: 'anotherToken',
    phoneNumber: '3199999999',
    name: 'Teste',
}

describe("UserService", () => {

    test("Create success", async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: user
        })

        const response: any = await userService.create(user as User)
        //Testando o mock

        expect(response.email).toBe(`test@test.com`) 
        expect(response.password).toBe('test123') 
        expect(response.passwordConfirmation).toBe('test123') 
        expect(response.passwordResetToken).toBe('token') 
        expect(response.profile).toBe('DRIVER') 
        expect(response.token).toBe('anotherToken') 
        expect(response.phoneNumber).toBe('3199999999') 
        expect(response.name).toBe('Teste') 
       
    })

    test('Forgot password', async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: user
        })

        const response : any = await userService.forgotPassword(user as User)
        expect(response.id).toBe('1')
    })

    test('Reset password', async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: user
        })

        const response : any = await userService.forgotPassword(user as User)
        expect(response.id).toBe('1')
    })
})

