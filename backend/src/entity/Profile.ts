import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Profile {
    
    @PrimaryColumn()
    name: string;
}