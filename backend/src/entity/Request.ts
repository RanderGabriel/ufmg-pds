import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Driver } from ".";
import Mechanic from "./Mechanic";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Driver)
    @JoinColumn()
    driver: Driver;

    @ManyToOne(type => Mechanic)
    @JoinColumn()
    mechanic: Mechanic;

    @Column()
    creationDate: Date;

    @Column()
    @Column({nullable:true})
    acceptanceDate: Date;

    @Column()
    @Column({nullable:true})
    refusalDate: Date;

    @Column()
    @Column({nullable:true})
    conclusionDate: Date;

}

export default Request;