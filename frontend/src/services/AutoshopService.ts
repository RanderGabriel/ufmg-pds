import { httpService } from './HttpService';
import { Autoshop } from '@/models/bussiness';

export default class AutoshopService {

    public async get(id: number) {
        try {
            const response = await httpService.get('/api/autoshop/get', {
                id,
            });
            return response.data ? new Autoshop(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async getAll() {
        try {
            const response = await httpService.get('/api/autoshop/getAll');
            return response.data.length ? response.data.map((e: Autoshop) => new Autoshop(e)) : [];
        } catch (error) {
            throw error;
        }
    }

    public async create(data: Autoshop) {
        try {
            const response = await httpService.post<Autoshop>('/api/autoshop/create', data);
            return response.data ? new Autoshop(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async update(data: Autoshop) {
        try {
            const response = await httpService.post<Autoshop>('/api/autoshop/update', data);
            return response.data ? new Autoshop(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: number) {
        try {
            const response = await httpService.get('/api/autoshop/delete', {
                id,
            });
        } catch (error) {
            throw error;
        }
    }

}

export const autoshopService = new AutoshopService();