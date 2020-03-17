import {Entity, PrimaryColumn, Column, ManyToOne} from "typeorm";
import {Profile} from "./Profile"

@Entity()
export class User {

    @PrimaryColumn()
    email: string;

    @Column()
    passwordHash: string;

    @ManyToOne(type => Profile, profile => profile.users)
    profile: Profile;
}