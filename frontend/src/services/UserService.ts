import User from "../models/bussiness/User";
import { httpService } from './HttpService';

export default class UserService {

    public async create(data: User) {
        let route = '';
        if(data.profile === "MECHANIC") {
            route = '/api/mechanic/create';
        } else {
            route = '/api/driver/create';
        }
        try {
            const response = await httpService.post<User>(route, data);
            return response.data ? new User(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async login(data: User): Promise<User> {
        try {
            const response = await httpService.post<User>('/api/login', data);
            httpService.setAuthToken(response.token);
            const user = new User(response);
            console.log(user);
            this.saveUser(user);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async forgotPassword(data: User) {
        try {
            const response = await httpService.post<User>('/api/login/forgot-password', data);
            return response.data ? new User(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public saveUser(user: User) {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public getCurrentUser() : User | null {
        const raw = localStorage.getItem('userInfo');
        if (!raw) return null;
        return new User(JSON.parse(raw));
    }

    public init() {
        const user = this.getCurrentUser();
        if(user && user.token)
            httpService.setAuthToken(user.token);
    }
}

export const userService = new UserService();