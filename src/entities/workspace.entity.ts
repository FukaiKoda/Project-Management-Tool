import { Entity, PrimaryGeneratedColumn, Column,
         CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm'

import Board from './board.entity.js'
import WorkspaceMember from './workspaceMember.entity.js'

@Entity('workspaces')
export default class Workspace {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 30 })
    name: string

    @Column({ type: 'text' })
    description: string

    @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.workspace)
    members: WorkspaceMember[]

    @OneToMany(() => Board, (board) => board.workspace)
    boards: Board[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}