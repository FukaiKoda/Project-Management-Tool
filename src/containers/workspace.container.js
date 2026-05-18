import WorkspaceMiddleware from '../middlewares/workspace.middleware.js'
import WorkspaceController from '../controllers/workspace.controller.js'
import WorkspaceService from '../services/workspace.service.js'
import WorkspaceRepository from '../repositories/workspace.repository.js'

const workspaceMiddleware = new WorkspaceMiddleware()
const workspaceRepository = new WorkspaceRepository()
const workspaceService = new WorkspaceService(workspaceRepository)
const workspaceController = new WorkspaceController(workspaceService)

export { workspaceMiddleware, workspaceController }