import { httpService } from './HttpService';
import { Evaluation } from '@/models/bussiness';

export default class EvaluationService {

    public async create(comment: string, grade: number, mechanicId: number) {
        const response = await httpService.post('/api/evaluation/create', { comment, grade, mechanicId });
        return response.data ? new Evaluation(response.data) : null;
    }
}

export const evaluationService = new EvaluationService();
