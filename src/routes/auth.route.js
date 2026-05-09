import express from 'express'
import { HOST, PORT} from '../config/env.js'
import { authMiddleware, authController, passport } from '../containers/auth.container.js';

const authRouter = express.Router()

authRouter.post('/signup', authMiddleware.signup, authController.signup)

authRouter.post('/login', authMiddleware.login, authController.login)

authRouter.post('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => { res.redirect(`${HOST}:${PORT}/dashboard`) }
)

authRouter.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => { res.redirect(`${HOST}:${PORT}/dashboard`) }
)

export default authRouter