import { User } from '@/models/bussiness';
import { httpService } from './HttpService';
import { userService } from './UserService';

export default class AuthService {

    public async login(email: string, password: string) {
        const response = await httpService.post('/api/login', {
            email,
            password,
        });
        if (response && response.data.token) {
            localStorage.setItem('token', response.data.token);
            if(response.data.user) {
                const user = new User({
                    ...response.data.user, profile: response.data.user.profile.name
                })
                userService.saveUser(user);
                httpService.setup();
                return user;
            }
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
