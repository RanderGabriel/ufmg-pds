import { Entity, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Driver {
    @PrimaryColumn()
    userEmail: string;
}