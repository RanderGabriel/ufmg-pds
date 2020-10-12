import { httpService } from './HttpService';
import { Solicitation } from '@/models/bussiness';

export default class SolicitationService {

    public async create(message: string) {
        const response = await httpService.post('/api/solicitation/create', { message });
        return response.data ? new Solicitation(response.data) : null;
    }

    public async accept(id: number) {
        const response = await httpService.post('/api/solicitation/accept', { id });
        return true;
    }

    public async start(id: number) {
        const response = await httpService.post('/api/solicitation/start', { id });
        return true;
    }

    public async cancel(id: number) {
        const response = await httpService.post('/api/solicitation/cancel', { id });
        return true;
    }

    public async finish(id: number) {
        const response = await httpService.post('/api/solicitation/finish', { id });
        return true;
    }

    public async getAll(){
        const response = await httpService.get('/api/solicitation/getAll');
        return response;
    }

    public async actives(){
        const response = await httpService.get('/api/solicitation/actives');
        return response;
    }
}

export const solicitationService = new SolicitationService();
