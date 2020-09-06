import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn } from "typeorm";
import { Mechanic } from "./Mechanic";

@Entity()
export class Autoshop {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Mechanic)
    @JoinColumn()
    mechanic: Mechanic;

    @Column()
    street: string;

    @Column()
    streetNumber: number;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    zipCode: string;

    @Column({
        default: false
    })
    ableToMove: boolean;
    
}

export default Autoshop;