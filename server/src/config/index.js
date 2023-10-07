import dotenv from 'dotenv'

dotenv.config()

//export const DB_URI = "mongodb://localhost:27017/trans-tasks"
export const DB_URI = process.env.MONGO_URI
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL
export const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL
