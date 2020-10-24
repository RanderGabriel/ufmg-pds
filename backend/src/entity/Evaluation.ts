import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import Driver from "./Driver"
import Mechanic from "./Mechanic"
@Entity()
export default class Evaluation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    comment: string;

    @Column({ nullable: false })
    grade: number;

    @ManyToOne(type => Driver)
    @JoinColumn()
    driver: Driver;

    @ManyToOne(type => Mechanic)
    @JoinColumn()
    mechanic: Mechanic;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    public static createEntity(comment: string, grade: number,  driver: Driver, mechanic: Mechanic) {
        const newEntity = new Evaluation();
        newEntity.grade = grade
        newEntity.comment = comment;
        newEntity.driver = driver;
        newEntity.mechanic = mechanic;
        return newEntity;
    }
}
