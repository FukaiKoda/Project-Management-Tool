export default class WorkspaceController {
    
    constructor(workspaceService) {
        this.workspaceService = workspaceService
    }

    createWorkspace = async (req, res, next) => {
        
        try {
            const userId = req.user.id
            const workspace = await this.workspaceService.createWorkspace(userId, req.body)
            
            return res.status(201).json({ message: 'Workspace created successfully', workspace })
        }
        catch (error) {
            next(error)
        }
    }

    getWorkspaces = async (req, res, next) => {
        try {
            const userId = req.user.id
            const workspaces = await this.workspaceService.getWorkspaces(userId)
            
            return res.status(200).json({ workspaces })
        }
        catch (error) {
            next(error)
        }
    }

    getWorkspaceById = async (req, res, next) => {
        try {
            const userId = req.user.id
            const { id } = req.params
            const workspace = await this.workspaceService.getWorkspaceById(userId, id)
            
            return res.status(200).json({ workspace })
        }
        catch (error) {
            next(error)
        }
    }

    updateWorkspace = async (req, res, next) => {
        try {
            const userId = req.user.id
            const { id } = req.params
            const workspace = await this.workspaceService.updateWorkspace(userId, id, req.body)
            
            return res.status(200).json({ message: 'Workspace updated successfully', workspace })
        }
        catch (error) {
            next(error)
        }
    }

    deleteWorkspace = async (req, res, next) => {
        try {
            const userId = req.user.id
            const { id } = req.params
            await this.workspaceService.deleteWorkspace(userId, id)
            
            return res.status(200).json({ message: 'Workspace deleted successfully' })
        }
        catch (error) {
            next(error)
        }
    }
}