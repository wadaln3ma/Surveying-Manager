import asyncHandler from 'express-async-handler'
import { NODE_ENV } from '../config'
import { logEvents } from './logger.middleware'

export const notFound = (req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export const errorHandler = (error, req, res, next)=>{
  logEvents(`${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = error.message

    if(error.name ==='CastError' && error.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource Not Found'
    }

  if(error.isJoi){
    statusCode = 422
  }

    res.status(statusCode).json({
        message,
        success: false,
        stack: NODE_ENV !== 'development' ? null : error.stack
    })
}
