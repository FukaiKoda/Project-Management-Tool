import { Column, CreateDateColumn, Entity,
         ManyToOne, PrimaryGeneratedColumn,
         UpdateDateColumn } from "typeorm";

import List from "./list.entity.js";


@Entity('cards')
export default class Card {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 30 })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'integer' })
    position: number

    @Column({ type: 'timestamp', nullable: true })
    dueDate: Date

    @ManyToOne(() => List, (list) => list.cards)
    list: List

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}