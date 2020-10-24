import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Driver, Mechanic } from ".";

@Entity()
export default class Evaluation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(type => Driver)
    @JoinColumn()
    driver: Driver;

    @ManyToOne(type => Mechanic)
    @JoinColumn()
    mechanic: Mechanic;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    public static createEntity(comment: string, driver: Driver, mechanic: Mechanic) {
        const newEntity = new (Evaluation);
        newEntity.comment = comment;
        newEntity.driver = driver;
        newEntity.mechanic = mechanic;
        return newEntity;
    }

}
