export default class Solicitation {

    id: number;
    message: string;
    driver: any;
    mechanic: any;
    createdAt: Date;
    acceptedAt: Date;
    refusedAt: Date;
    finishedAt: Date;
    coordinates: string;


    constructor(entity: Solicitation) {
        this.id = entity.id;
        this.message = entity.message;
        this.driver = entity.driver;
        this.createdAt = entity.createdAt;
        this.acceptedAt = entity.acceptedAt;
        this.refusedAt = entity.refusedAt;
        this.finishedAt = entity.finishedAt;
        this.coordinates = entity.coordinates;
    }

}
