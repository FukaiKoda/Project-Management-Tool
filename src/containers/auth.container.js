import AuthMiddleware from '../middlewares/auth.middleware.js'
import AuthController from '../controllers/auth.controller.js'
import AuthService from '../services/auth.service.js'
import AuthRepository from '../repositories/auth.repository.js'

import passport from 'passport'
import configurePassport from '../config/passport.js'

const authMiddleware = new AuthMiddleware()
const authRepository = new AuthRepository()
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

configurePassport(passport, authService)

export { authMiddleware, authController, passport }