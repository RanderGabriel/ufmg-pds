import User from "../models/bussiness/User";
import { httpService } from './HttpService';

export default class UserService {

    public async create(data: User) {
        try {
            const response = await httpService.post<User>('/api/mechanic', data);
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