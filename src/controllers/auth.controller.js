export default class AuthController {

    constructor(authService) {
        this.authService = authService
    }

    signup = async (req, res, next) => {

        try {
            const { username, email, password } = req.body
            const user = await this.authService.signup({ username, email, password })

            req.login(user, (err) => {
                
                if (err) {
                    return next(err)
                }
                return res.status(200).json({ message: 'Signup successful', user })
            })
        }
        catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {

        res.status(200).json({ message: 'Login successful', user: req.user })
    }

    logout = (req, res, next) => {
        req.logout((err) => {
            
            if (err) {
                return next(err)
            }
            req.session.destroy((err) => {
                
                if (err) {
                    return next(err)
                }
                res.clearCookie('connect.sid')
                return res.status(200).json({ message: 'Logged out successfully' })
            })
        })
    }
}