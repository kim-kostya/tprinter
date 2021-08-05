import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity("document")
export default class {
    @PrimaryGeneratedColumn({name: "id"}) id!: string;
    @Column({name: "path"}) path!: string;
    @ManyToOne(type => User)
    @JoinColumn({ name: "author", referencedColumnName: "id" })
    author!: User;
}