import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'

export default class AuthService {

    constructor(authRepository) {
        this.authRepository = authRepository
    }

    signup = async (userData) => {

        const { username, email, password } = userData
        const hash = await argon2.hash(password, { type: argon2.argon2id })

        const user = this.authRepository.createUser({ username, email, password: hash })
        return user
    }

    login = async (userData) => {

        const { username, password } = userData
        const storedUser = await this.authRepository.findUserByusername(username)
        
        if (!storedUser) {
            throw new AppError('Invalid Credentials', 401)
        }
        
        const isMatch = await argon2.verify(password, storedUser.password)
        
        if (!isMatch) {
            throw new AppError('Invalid Credentials', 401)
        }

        return storedUser
    }

    generateJWT = (userData) => {

        const payload = {
            sub: userData.id,
            role: userData.role
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })

        return { token, refreshToken }
    }

    handleOAuthLogin = async (profile, provider) => {
        const username = profile.displayName || profile.username;
        const email = profile.emails ? profile.emails[0].value : null;
        
        let user = await this.authRepository.findUserByUsername(username)

        if (!user) {
            user = await this.authRepository.createUser({
                username: username,
                email: email,
                password: `${provider}_PROVIDER`
            })
        }

        return user
    }

    findUserById = async (id) => {
        return await this.authRepository.findUserById(id)
    }
}