import { httpService } from './HttpService';
import { Request } from '@/models/bussiness';

export default class RequestService {

    public async create() {
        try {
            const response = await httpService.post<Request>('/api/request/create');
            return response.data ? new Request(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

}

export const requestService = new RequestService();
