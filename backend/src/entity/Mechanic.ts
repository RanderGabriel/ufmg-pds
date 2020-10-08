import { Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import User  from "./User";

@Entity()
export default class Mechanic {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    static createEntity(user: User) {
        const newEntity = new Mechanic();
        newEntity.user = user;
        return newEntity;
    }

}
