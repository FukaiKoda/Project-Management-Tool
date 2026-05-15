import z from 'zod'
import AppError from '../utils/app.error.js';

export default class AuthMiddleware {

    signup = (req, res, next) => {
        
        const signupSchema = z.object({
          username: z.string().trim().min(3).max(20),
          email: z.email(),
          password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
          confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
        });

        const { username, email, password, confirmPassword } = req.body
        const result = signupSchema.safeParse({ username, email, password, confirmPassword })

        if (!result.success) {
            return next(result.error.issues)
        }
        
        req.body = {...req.body, ...result.data}
        next()
    }

    login = (req, res, next) => {
        
        const loginSchema = z.object({
          username: z.string().trim().min(3).max(20),
          password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
        })

        const { username, password } = req.body
        const result = loginSchema.safeParse({ username, password })

        if (!result.success) {
            return next(result.error.issues)
        }
        
        req.body = {...req.body, ...result.data}
        next()
    }

    isAuthenticated = (req, res, next) => {
        
        if (req.isAuthenticated()) {
            return next()
        }
        return next(new AppError('Unauthorized', 401))
    }
}