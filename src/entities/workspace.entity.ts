import { Entity, PrimaryGeneratedColumn, Column,
         CreateDateColumn, UpdateDateColumn, ManyToOne, 
         OneToMany} from 'typeorm';

import User from './user.entity.js';
import Board from './board.entity.js';

@Entity('workspaces')
export default class Workspace {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 30 })
    name: string

    @Column({ type: 'text' })
    description: string

    @ManyToOne(() => User, (user) => user.workspaces)
    owner: User

    @OneToMany(() => Board, (board) => board.workspace)
    boards: Board[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}