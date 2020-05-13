import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Timestamp} from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    avatar: string;

    @Column()
    @UpdateDateColumn()
    update_at: Timestamp

    @Column()
    @CreateDateColumn()
    created_at: Timestamp

}
