import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import User  from "./User";

@Entity()
export default class Access {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userToken: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;
    
}
