import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity()
export default class Driver {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    static createEntity(user: User) {
        const newEntity = new Driver();
        newEntity.user = user;
        return newEntity;
    }

}
 
