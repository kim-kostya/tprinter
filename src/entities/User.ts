import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class {
    @PrimaryGeneratedColumn({name: "id"}) id!: number;
    @Column() nickname!: string;
    @Column() privileges!: string[];
}