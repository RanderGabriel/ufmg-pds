import {Entity, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm';
import {User} from './User';

@Entity()
export class Mechanic {

    @PrimaryColumn()
    @OneToOne(type => User)
    @JoinColumn()
    userEmail: User
}