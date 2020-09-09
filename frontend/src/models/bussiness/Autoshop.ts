export default class Autoshop {

    public readonly id: number | null;
    public street: string;
    public streetNumber: number;
    public city: string;
    public state: string;
    public country: string;
    public zipCode: string;
    public ableToMove: boolean;
    public mechanicId: number;

    constructor(entity: Autoshop) {
        this.id = entity.id;
        this.street = entity.street;
        this.streetNumber = entity.streetNumber;
        this.city = entity.city;
        this.state = entity.state;
        this.country = entity.country;
        this.zipCode = entity.zipCode;
        this.ableToMove = entity.ableToMove;
        this.mechanicId = entity.mechanicId;
    }

}