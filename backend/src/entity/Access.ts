import { Entity, PrimaryColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Access {
    @PrimaryColumn()
    userToken: string;

    @ManyToOne(type => User, user => user.accesses)
    user: User;
}
