import {Entity, PrimaryColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Profile} from "./Profile"
import { Access } from "./Access";

@Entity()
export class User {
    
    @PrimaryColumn()
    email: string;

    @Column()
    passwordHash: string;

    @Column({nullable:true})
    passwordResetToken: string;

    @Column({nullable:true})
    passwordResetExpires: Date;

    @ManyToOne(type => Profile, profile => profile.users)
    profile: Profile;

    @OneToMany(type => Access, access => access.user)
    accesses: Access[];
}