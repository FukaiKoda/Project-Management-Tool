import { Entity, PrimaryGeneratedColumn, Column,
         CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import Workspace from './workspace.entity.js';

@Entity('users')
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true, type: 'varchar', length: 30 })
    username: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ nullable: true })
    avatarUrl: string

    @OneToMany(() => Workspace, (workspace) => workspace.owner)
    workspaces: Workspace[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}