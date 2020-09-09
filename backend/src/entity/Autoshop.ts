import { Entity, PrimaryGeneratedColumn, OneToOne, Column, JoinColumn } from "typeorm";
import User from "./User";

@Entity()
export class Autoshop {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    mechanic: User;

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