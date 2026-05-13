import { Column, CreateDateColumn, Entity,
         ManyToOne, OneToMany, PrimaryGeneratedColumn,
         UpdateDateColumn } from "typeorm";

import Board from "./board.entity.js";
import Card from "./card.entity.js";


@Entity('lists')
export default class List {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 30 })
    name: string

    @Column({ type: 'integer' })
    position: number

    @ManyToOne(() => Board, (board) => board.lists)
    board: Board

    @OneToMany(() => Card, (card) => card.list)
    cards: Card[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}