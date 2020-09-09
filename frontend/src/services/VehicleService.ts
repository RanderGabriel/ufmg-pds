import { httpService } from './HttpService';
import { Vehicle } from '@/models/bussiness';

export default class VehicleService {

    public async get(id: number) {
        try {
            const response = await httpService.get('/api/vehicle/get', {
                id,
            });
            return response.data ? new Vehicle(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async getAll() {
        try {
            const response = await httpService.get('/api/vehicle/getAll');
            return response.data.length ? response.data.map((e: Vehicle) => new Vehicle(e)) : [];
        } catch (error) {
            throw error;
        }
    }

    public async create(data: Vehicle) {
        try {
            const response = await httpService.post<Vehicle>('/api/vehicle/create', data);
            return response.data ? new Vehicle(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async update(data: Vehicle) {
        try {
            const response = await httpService.post<Vehicle>('/api/vehicle/update', data);
            return response.data ? new Vehicle(response.data) : null;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: number) {
        try {
            const response = await httpService.get('/api/vehicle/delete', {
                id,
            });
            return response
        } catch (error) {
            throw error;
        }
    }

}

export const vehicleService = new VehicleService();
