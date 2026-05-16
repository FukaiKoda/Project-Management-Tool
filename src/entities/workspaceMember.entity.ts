import { Column, CreateDateColumn, Entity,
         ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import WorkspaceRole from '../enums/role.enum.js'
import User from "./user.entity.js";
import Workspace from "./workspace.entity.js";

@Entity('workspace_members')
export default class WorkspaceMember {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'enum', enum: WorkspaceRole, default: WorkspaceRole.MEMBER })
    role: WorkspaceRole

    @ManyToOne(() => User, (user) => user.workspaceMembers, { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Workspace, (workspace) => workspace.members, { onDelete: 'CASCADE' })
    workspace: Workspace

    @CreateDateColumn()
    joinedAt: Date
}