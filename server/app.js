import express from 'express'
import dotenv from 'dotenv'
import user from './routes/user.js'
import contact from './routes/contact.js'
import blog from './routes/blog.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
}
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use('/api/v1', user)
app.use('/api/v1', contact)
app.use('/api/v1', blog)

export default app;