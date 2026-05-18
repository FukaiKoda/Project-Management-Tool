import express from 'express'
import { authMiddleware } from '../containers/auth.container.js'
import { workspaceMiddleware, workspaceController } from '../containers/workspace.container.js'

const workspaceRouter = express.Router()

workspaceRouter.use(authMiddleware.isAuthenticated)

workspaceRouter.post('/', workspaceMiddleware.createWorkspace, workspaceController.createWorkspace)
workspaceRouter.get('/', workspaceController.getWorkspaces)
workspaceRouter.get('/:id', workspaceController.getWorkspaceById)
workspaceRouter.patch('/:id', workspaceMiddleware.updateWorkspace, workspaceController.updateWorkspace)
workspaceRouter.delete('/:id', workspaceController.deleteWorkspace)

export default workspaceRouter