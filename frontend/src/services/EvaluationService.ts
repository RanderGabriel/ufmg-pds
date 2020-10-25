import { httpService } from './HttpService';
import { Evaluation } from '@/models/bussiness';

export default class EvaluationService {

    public async getByDriverId(id: number) {
        const response = await httpService.get('/api/evaluation/driver', {
            id
        });
        return response.data.length ? response.data.map((e: Evaluation) => new Evaluation(e)) : [];
    }

    public async getByMechanicId(id: number) {
        const response = await httpService.get('/api/evaluation/mechanic', {
            id
        });
        return response.data.length ? response.data.map((e: Evaluation) => new Evaluation(e)) : [];
    }

    public async create(comment: string, createdBy: string, grade: number, mechanicId: number) {
        const response = await httpService.post('/api/evaluation/create', { comment, grade, mechanicId, createdBy });
        return response.data ? new Evaluation(response.data) : null;
    }

}

export const evaluationService = new EvaluationService();
