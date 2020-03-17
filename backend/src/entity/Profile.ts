import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";
import {User} from './User'
@Entity()
export class Profile {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(type => User, user => user.profile)
    users: User[];
}