import { httpService } from './HttpService';
import { Vehicle } from '@/models/bussiness';

export default class VehicleService {

    public async get(id: number) {
        const response = await httpService.get('/api/vehicle/get', {
            id,
        });
        return response.data ? new Vehicle(response.data) : null;
    }

    public async getAll() {
        const response = await httpService.get('/api/vehicle/getAll');
        return response.data.length ? response.data.map((e: Vehicle) => new Vehicle(e)) : [];
    }

    public async create(data: Vehicle) {
        const response = await httpService.post<Vehicle>('/api/vehicle/create', data);
        return response.data ? new Vehicle(response.data) : null;
    }

    public async update(data: Vehicle) {
        const response = await httpService.post<Vehicle>('/api/vehicle/update', data);
        return response.data ? new Vehicle(response.data) : null;
    }

    public async delete(id: number) {
        const response = await httpService.get('/api/vehicle/delete', {
            id,
        });
        return response;
    }

}

export const vehicleService = new VehicleService();
