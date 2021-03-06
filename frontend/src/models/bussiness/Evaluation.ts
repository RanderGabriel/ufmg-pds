export default class Evaluation {

    id: number;
    comment: string;
    grade: number;
    createdBy: string;
    driver: any;
    mechanic: any;
    createdAt: Date;

    constructor(entity: Evaluation) {
        this.id = entity.id;
        this.driver = entity.driver;
        this.mechanic = entity.mechanic;
        this.createdAt = entity.createdAt;
        this.createdBy = entity.createdBy;
        this.grade = entity.grade;
        this.comment = entity.comment
    }

}