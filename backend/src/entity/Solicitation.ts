import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Driver, Mechanic } from ".";

@Entity()
export default class Solicitation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(type => Driver)
    @JoinColumn()
    driver: Driver;

    @ManyToOne(type => Mechanic)
    @JoinColumn()
    mechanic: Mechanic;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    @Column({ nullable: true })
    finishedAt: Date;

    @Column({ default: () => "'{}'" })
    coordinates: string;

    public static createEntity(message: string, driver: Driver) {
        const newEntity = new Solicitation();
        newEntity.message = message;
        newEntity.driver = driver;
        return newEntity;
    }

}
