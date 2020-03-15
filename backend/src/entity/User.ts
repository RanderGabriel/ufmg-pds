import {Entity, Column, PrimaryColumn, JoinColumn, OneToOne} from "typeorm";
import {Profile} from "./Profile"

@Entity()
export class User {

    @PrimaryColumn()
    email: string;

    @Column()
    passwordHash: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;
}