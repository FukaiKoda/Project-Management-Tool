import argon2 from 'argon2'
import AppError from '../utils/app.error.js'

export default class AuthService {

    constructor(authRepository) {
        this.authRepository = authRepository
    }

    signup = async (userData) => {

        const { username, email, password } = userData
        const hash = await argon2.hash(password, { type: argon2.argon2id })

        const user = await this.authRepository.createUser({ username, email, password: hash })
        return user
    }

    login = async (userData) => {

        const { username, password } = userData
        const storedUser = await this.authRepository.findUserByUsername(username)
        
        if (!storedUser) {
            throw new AppError('Invalid Credentials', 401)
        }
        
        if (!storedUser.password) {
            throw new AppError('Please login using your OAuth provider', 401)
        }

        const isMatch = await argon2.verify(storedUser.password, password)
        
        if (!isMatch) {
            throw new AppError('Invalid Credentials', 401)
        }

        return storedUser
    }

    handleOAuthLogin = async (profile, provider) => {
        const username = profile.displayName || profile.username;
        const email = profile.emails ? profile.emails[0].value : null;
        
        let user = await this.authRepository.findUserByUsername(username)

        if (!user) {
            user = await this.authRepository.createUser({
                username: username,
                email: email,
            })
        }

        return user
    }

    findUserById = async (id) => {
        return await this.authRepository.findUserById(id)
    }
}