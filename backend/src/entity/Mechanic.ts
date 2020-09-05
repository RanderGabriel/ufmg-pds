import { Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export default class Mechanic {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}
