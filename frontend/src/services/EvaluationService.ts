import { httpService } from './HttpService';
import { Evaluation } from '@/models/bussiness';

export default class EvaluationService {

    public async getByMechanicId(id: number) {
        const response = await httpService.get('/api/evaluation/mechanic', {
            id
        });
        console.log(response.data)
        return response.data.length ? response.data.map((e: Evaluation) => new Evaluation(e)) : [];
    }

    public async create(comment: string, grade: number, mechanicId: number) {
        const response = await httpService.post('/api/evaluation/create', { comment, grade, mechanicId });
        return response.data ? new Evaluation(response.data) : null;
    }

}

export const evaluationService = new EvaluationService();
