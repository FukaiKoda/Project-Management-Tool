import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import session from 'express-session'
import { passport } from './src/containers/auth.container.js'
import { createClient } from 'redis'
import { RedisStore } from 'connect-redis'
import { REDIS_URL, SESSION_SECRET } from './src/config/env.js'
import 'reflect-metadata'
import AppDataSource from './src/config/data-source.js'

import authRouter from './src/routes/auth.route.js'

import { setupSwagger } from './src/config/swagger.js'

const app = express()

setupSwagger(app)

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 150,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
}))

app.use(cors())

app.use(helmet())

app.use(morgan('dev'))

app.use(express.json({ limit: '10kb' }))

// app.use(express.static(path.join(import.meta.dirname, 'public')))


const redisClient = createClient({ url: REDIS_URL })

redisClient.on('error', (err) => console.error('Redis Client Error', err))

try 
{
    await redisClient.connect()
} catch (err) {
    console.error("Couldn't connect to redis client")
    process.exit(1)
}

app.use(session({
    store: new RedisStore({ client: redisClient }), 
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,             // (XSS protection)
        secure: false,              // sends cookies over https for localhost
        sameSite: 'lax',            // (CSRF protection)
        maxAge: 1000 * 60 * 60 * 24 // 1 Day expiration 
    }
}))

app.use(passport.authenticate('session'))

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch((error) => {
        console.error("Error during data source initialization: ", error)
        process.exit(1)
    })

app.use('/api/v1/auth/', authRouter)

export default app