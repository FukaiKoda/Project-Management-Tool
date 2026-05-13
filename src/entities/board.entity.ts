import { Column, CreateDateColumn, Entity,
         ManyToOne, OneToMany, PrimaryGeneratedColumn,
         UpdateDateColumn } from "typeorm";

import Workspace from "./workspace.entity.js";
import List from "./list.entity.js";

@Entity('boards')
export default class Board {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 30 })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ nullable: true})
    background: string

    @ManyToOne(() => Workspace, (workspace) => workspace.boards)
    workspace: Workspace

    @OneToMany(() => List, (list) => list.board)
    lists: List[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}