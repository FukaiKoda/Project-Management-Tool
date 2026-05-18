import AppDataSource from '../config/data-source.js'
import Workspace from '../entities/workspace.entity.ts'
import WorkspaceMember from '../entities/workspaceMember.entity.ts'
import WorkspaceRole from '../enums/role.enum.js'
import AppError from '../utils/app.error.js'

export default class WorkspaceService {
    
    constructor(workspaceRepository) {
        this.workspaceRepository = workspaceRepository
    }

    createWorkspace = async (userId, data) => {
        
        const { name, description } = data

        return await AppDataSource.transaction(async (transactionalEntityManager) => {
            const workspace = transactionalEntityManager.create(Workspace, { name, description })
            const savedWorkspace = await transactionalEntityManager.save(workspace)

            const member = transactionalEntityManager.create(WorkspaceMember, {
                role: WorkspaceRole.OWNER,
                user: { id: userId },
                workspace: savedWorkspace
            })
            await transactionalEntityManager.save(member)

            return savedWorkspace
        })
    }

    getWorkspaces = async (userId) => {
        return await this.workspaceRepository.findWorkspacesByUserId(userId)
    }

    getWorkspaceById = async (userId, workspaceId) => {
        
        const workspace = await this.workspaceRepository.findById(workspaceId)
        if (!workspace) {
            throw new AppError('Workspace not found', 404)
        }

        const isMember = workspace.members.some(member => member.user.id === userId)
        if (!isMember) {
            throw new AppError('Unauthorized access to workspace', 403)
        }

        return workspace
    }

    updateWorkspace = async (userId, workspaceId, data) => {
        
        const workspace = await this.workspaceRepository.findById(workspaceId)
        if (!workspace) {
            throw new AppError('Workspace not found', 404)
        }

        const member = workspace.members.find(m => m.user.id === userId)
        if (!member || (member.role !== WorkspaceRole.OWNER && member.role !== WorkspaceRole.ADMIN)) {
            throw new AppError('Unauthorized to update workspace', 403)
        }

        return await this.workspaceRepository.update(workspaceId, data)
    }

    deleteWorkspace = async (userId, workspaceId) => {
        
        const workspace = await this.workspaceRepository.findById(workspaceId)
        if (!workspace) {
            throw new AppError('Workspace not found', 404)
        }

        const member = workspace.members.find(m => m.user.id === userId)
        if (!member || member.role !== WorkspaceRole.OWNER) {
            throw new AppError('Unauthorized to delete workspace', 403)
        }

        return await this.workspaceRepository.delete(workspaceId)
    }
}