export default class Evaluation {

    id: number;
    evaluation: string;
    grade: number
    driver: any;
    mechanic: any;
    createdAt: Date;

    constructor(entity: Evaluation) {
        this.id = entity.id;
        this.driver = entity.driver;
        this.createdAt = entity.createdAt;
        this.grade = entity.grade;
        this.evaluation = entity.evaluation
    }


}