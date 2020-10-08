import { httpService } from './HttpService';

export default class AuthService {

    public async login(email: string, password: string) {
        const response = await httpService.post('/api/login', {
            email,
            password,
        });
        if (response && response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
    }

    public isAuthenticated() {
        return localStorage.getItem('token') ? true : false;
    }

    public logoff() {
        localStorage.removeItem('token');
    }
}

export const authService = new AuthService();
