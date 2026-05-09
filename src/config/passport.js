import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GithubStrategy } from 'passport-github2'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './env.js'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './env.js'

export default function configurePassport(passport, authService) {
    
    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback'
        },
        async (_accessToken, _refreshToken, profile, done) => {
            
            try {
                const user = await authService.handleOAuthLogin(profile, 'GOOGLE')
                return done(null, user)
            }
            catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.use(new GithubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/github/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            
            try {
                const user = await authService.handleOAuthLogin(profile, 'GITHUB')
                return done(null, user)
            }
            catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        
        try {
            const user = await authService.findUserById(id)
            done(null, user)
        }
        catch (error) {
            done(error, null)
        }
    })
}