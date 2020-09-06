import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";

@Entity()
export default class Profile {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

}
