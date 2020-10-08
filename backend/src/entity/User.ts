import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import { generateSaltedPassword } from "../utils";
import Profile  from "./Profile"

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number | null;
    
    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({ nullable: true })
    passwordResetToken: string;

    @Column({ nullable: true })
    passwordResetExpires: Date;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @ManyToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    public static async createEntity(name, email, password, phoneNumber) {
        const newEntity = new User();
        newEntity.name = name;
        newEntity.email = email;
        newEntity.passwordHash = await generateSaltedPassword(password);
        newEntity.phoneNumber = phoneNumber;
        return newEntity;
    }

}
