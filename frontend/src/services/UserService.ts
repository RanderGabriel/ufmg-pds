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
        const response = await httpService.post<User>(route, data);
        return response.data ? new User(response.data) : null;
    }


    public async logoff(): Promise<boolean> {
        await httpService.post<User>(`/api/user/logoff`);
        this.removeUser();
        return true;
    }

    private removeUser() {
        localStorage.removeItem('userInfo');
    }

    public async forgotPassword(data: { email: string}) {
        const response = await httpService.post<{ email: string}>('/api/user/forgot-password', data);
        return response.data ? new User(response.data) : null;
    }

    public async resetPassword(data: User) {
        const response = await httpService.post<User>('/api/user/reset-password', data);
        return response.data ? new User(response.data) : null;
    }

    public saveUser(user: User) {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    public getCurrentUser() : User | null {
        const raw = localStorage.getItem('userInfo');
        if (!raw) return null;
        return new User(JSON.parse(raw));
    }

}

export const userService = new UserService();