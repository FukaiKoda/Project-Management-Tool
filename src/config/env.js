import dotenv from 'dotenv'

dotenv.config()

export const HOST = process.env.HOST
export const PORT = process.env.PORT

export const JWT_SECRET = process.env.JWT_SECRET
export const SESSION_SECRECT = process.env.SESSION_SECRECT

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET 

export const REDIS_URL = process.env.REDIS_URL
export const POSTGRES = process.env.POSTGRES