import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import Routes from './routes'
import { swaggerDocs } from './utils/swagger'
import { notFound, errorHandler } from './middlewares/error.middleware'
import { logger } from './middlewares/logger.middleware'
import corsOptions from './config/corsOptions'

const app = express()

app.use(logger)

app.use(cors(corsOptions))
//app.use(cors())

app.use(cookieParser())

app.use(express.json())


app.use('/api/v1', Routes)

swaggerDocs(app)

app.use(express.static(path.join(__dirname, '..', '..'  ,'client', 'dist')))

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, '..', '..' ,'client', 'dist', 'index.html'))
})

app.use(notFound)

app.use(errorHandler)

export default app
