export default class Request {
    public readonly id: number | null;
    public creationDate: Date;
    public acceptanceDate: Date;
    public refusalDate: Date;
    public conclusionDate: Date;

    constructor(entity: Request) {
        this.id = entity.id;
        this.creationDate = entity.creationDate;
        this.acceptanceDate = entity.acceptanceDate;
        this.refusalDate = entity.refusalDate;
        this.conclusionDate = entity.conclusionDate;
    }

}