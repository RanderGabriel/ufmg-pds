export default class Vehicle {

    public readonly id: number | null;
    public make: string;
    public model: string;
    public year: string | undefined;
    public color: string;
    public licensePlate: string;
    public ownerId: number;

    constructor(entity: Vehicle) {
        this.id = entity.id;
        this.make = entity.make;
        this.model = entity.model;
        this.year = entity.year;
        this.color = entity.color;
        this.licensePlate = entity.licensePlate;
        this.ownerId = entity.ownerId;
    }

}
