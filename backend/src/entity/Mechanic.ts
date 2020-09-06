import { Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Mechanic {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}

export default Mechanic;
