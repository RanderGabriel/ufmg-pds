import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { Profile } from "./Profile"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number | null;
    
    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({nullable:true})
    passwordResetToken: string;

    @Column({nullable:true})
    passwordResetExpires: Date;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @ManyToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

}
