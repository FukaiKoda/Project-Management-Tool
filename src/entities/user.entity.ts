import { Entity, PrimaryGeneratedColumn, Column,
         CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'

import WorkspaceMember from './workspaceMember.entity.js'

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, type: 'varchar', length: 30 })
    username: string

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column({ type: 'varchar', nullable: true })
    password: string

    @Column({ type: 'varchar', nullable: true })
    avatarUrl: string

    @OneToMany(() => WorkspaceMember, (workspaceMember) => workspaceMember.user)
    workspaceMembers: WorkspaceMember[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}