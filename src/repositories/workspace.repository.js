import AppDataSource from '../config/data-source.js'
import Workspace from '../entities/workspace.entity.ts'
import WorkspaceMember from '../entities/workspaceMember.entity.ts'

export default class WorkspaceRepository {

    constructor() {
        this.workspaceRepository = AppDataSource.getRepository(Workspace)
        this.memberRepository = AppDataSource.getRepository(WorkspaceMember)
    }

    create = async (workspaceData) => {
        const workspace = this.workspaceRepository.create(workspaceData)
        return await this.workspaceRepository.save(workspace)
    }

    findById = async (id) => {
        return await this.workspaceRepository.findOne({
            where: { id },
            relations: ['members', 'members.user']
        })
    }

    findWorkspacesByUserId = async (userId) => {
        return await this.workspaceRepository.find({
            where: {
                members: {
                    user: { id: userId }
                }
            },
            relations: ['members']
        })
    }

    update = async (id, data) => {
        await this.workspaceRepository.update(id, data)
        return await this.findById(id)
    }

    delete = async (id) => {
        return await this.workspaceRepository.delete(id)
    }
}