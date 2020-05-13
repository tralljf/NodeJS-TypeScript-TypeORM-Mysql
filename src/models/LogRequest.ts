import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Timestamp, ManyToOne, JoinColumn} from "typeorm";
import { text } from "express";
import User from "./User";

@Entity()
export default class LogRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "mediumtext"})
    action: string;

    @Column({length: 25})
    method:  string;

    @Column({name: 'user_id'})
    user: string;

    @Column({default: null, type: "mediumtext"})
    json_body: string;

    @Column({default: null, type: "mediumtext"})
    parameters: string;

    @Column()
    response_status:  number;

    @Column({default: null, type: "mediumtext"})
    response_value:  string;

    @Column({default: null})
    ip: string;

    @Column({default: false})
    exception:  boolean;

    @Column({default: null, type: "mediumtext"})
    exception_msg: string;

    @Column({default: null})
    user_agent: string;

    @Column('timestamp')
    execution_time: Timestamp;

    @Column()
    @CreateDateColumn()
    created_at: Timestamp

}
