import UserService from '../../../src/services/UserService'
import User from '../../../src/models/bussiness/User'
import { authService } from '@/services/AuthService'

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


describe("UserService", () => {

    test('Login success', async () => {
        require('../../../src/services/HttpService').httpService.__setPostResponse({
            data: {
                token: "abcd", user
            }
        });

        const response = await authService.login('test@test.com', 'test123')
        expect(response && response.id).toBe('1')
    })

})

