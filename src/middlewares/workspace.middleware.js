import z from 'zod'
import AppError from '../utils/app.error.js';

export default class WorkspaceMiddleware {

    createWorkspace = (req, res, next) => {
        const schema = z.object({
            name: z.string().trim().min(3).max(30),
            description: z.string().trim().optional()
        })

        const result = schema.safeParse(req.body)

        if (!result.success) {
            return next(new AppError(result.error.issues[0].message, 400))
        }

        req.body = result.data
        next()
    }

    updateWorkspace = (req, res, next) => {
        const schema = z.object({
            name: z.string().trim().min(3).max(30).optional(),
            description: z.string().trim().optional()
        })

        const result = schema.safeParse(req.body)

        if (!result.success) {
            return next(new AppError(result.error.issues[0].message, 400))
        }

        req.body = result.data
        next()
    }
}