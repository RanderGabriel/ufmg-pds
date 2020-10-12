import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User  from "./User";
@Entity()
export default class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    color: string;

    @Column()
    licensePlate: string;

    @ManyToOne(type => User)
    @JoinColumn()
    owner: User;

    static toModel(station: any) {
        throw new Error("Method not implemented.");
    }

}
