import AppDataSource from '../config/data-source.js'
import User from '../entities/user.entity.ts'

export default class AuthRepository {

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    CreateUser = async (userData) => {
        
        const user = this.userRepository.create(userData)
        return await this.userRepository.save(user)
    }

    findUserByUsername = async (username) => {

        return await this.userRepository.findOneBy({ username })
    }

    findUserById = async (id) => {

        return await this.userRepository.findOneBy({ id })
    }
}