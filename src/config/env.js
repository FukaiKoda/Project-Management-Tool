import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

function getSecretOrEnv(key) {
    
    const secretPath = `/run/secrets/${key.toLowerCase()}`
    try {
        if (fs.existsSync(secretPath)) {
            return fs.readFileSync(secretPath, 'utf8').trim()
        }
    } catch (err) {
        console.warn(`Could not read secret ${key}:`, err.message)
    }
    return process.env[key]
}

export const HOST = getSecretOrEnv('HOST')
export const PORT = getSecretOrEnv('PORT')

export const SESSION_SECRET = getSecretOrEnv('SESSION_SECRET')

export const GOOGLE_CLIENT_ID = getSecretOrEnv('GOOGLE_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = getSecretOrEnv('GOOGLE_CLIENT_SECRET')

export const GITHUB_CLIENT_ID = getSecretOrEnv('GITHUB_CLIENT_ID')
export const GITHUB_CLIENT_SECRET = getSecretOrEnv('GITHUB_CLIENT_SECRET') 

export const REDIS_URL = getSecretOrEnv('REDIS_URL')

export const POSTGRES_URL = getSecretOrEnv('POSTGRES_URL')
export const POSTGRES_PASS = getSecretOrEnv('POSTGRES_PASS')