import User from "../models/bussiness/User";
import { httpService } from './HttpService';

export default class UserService {

    public async create(data: User) {
        let route = '';
        if(data.profile === "MECHANIC") {
            route = '/api/mechanic';
        } else {
            route = '/api/driver';
        }
        try {
            const response = await httpService.post<User>(route, data);
            return response.data ? new User(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async login(data: User): Promise<string> {
        try {
            const response = await httpService.post<User>('/api/login', data);
            return response.token as string;
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService();