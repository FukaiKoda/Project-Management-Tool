export default class AuthController {

    constructor(authService) {
        this.authService = authService
    }

    signup = async (req, res, next) => {

        try {
            const { username, email, password } = req.body
            const user = await this.authService.signup({ username, email, password })
            res.status(200).json(user)
        }
        catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {

        try {
            const { username, password } = req.body
            const user = await this.authService.login({ username, password })
            
            const {jwt, refreshJwt} = generateJWT(user)
            res.status(200).json(jwt, refreshJwt)
        }
        catch (error) {
            next(error)
        }
    }
}