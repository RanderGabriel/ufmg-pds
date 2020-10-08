import { httpService } from './HttpService';
import { Solicitation } from '@/models/bussiness';

export default class SolicitationService {

    public async create(message: string) {
        const response = await httpService.post('/api/solicitation/create', { message });
        return response.data ? new Solicitation(response.data) : null;
    }

}

export const solicitationService = new SolicitationService();
