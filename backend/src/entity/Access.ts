import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Access {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userToken: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;
    
}
