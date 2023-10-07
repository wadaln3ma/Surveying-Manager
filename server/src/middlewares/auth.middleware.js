import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/user.model'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config'

/*export const protect = asyncHandler(async (req, res, next)=>{

  const refreshToken = req.cookies?.refreshToken

  if(!refreshToken){
    res.status(401)
    throw new Error('not authorized - No Refresh Token')
  }

  try{
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    //req.userId = decoded.userId
    next()
  }catch(err){
    res.status(401)
    throw new Error('not authorized - Bad Refresh Token')
  }
})*/

export const protectRoutes = asyncHandler(async (req, res, next)=>{
  const accessToken = req.headers.authorization?.split(' ')[1]

  if(!accessToken){
    res.status(401)
    throw new Error('not authorized - No Access Token')
  }

  try{
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    req.userInfo = decoded.userInfo
    next()
  }catch(err){
    res.status(403)
    throw new Error('not authorized - Bad Access Token')
  }

})

export const adminsOnly = asyncHandler(async (req, res, next)=>{
  const { userInfo } = req
  const user = await UserModel.findById(userInfo.userId).lean()

  if(!user){
    res.status(401)
    throw new Error('Not Authorized - Admins Only')
  }

  if(user.role !== 'admin'){
    res.status(403)
    throw new Error('Not Authorized - Admins Only')
  }

  next()
})

export const superAdminsOnly = asyncHandler(async (req, res, next)=>{
  const { userInfo } = req
  const user = await UserModel.findById(userInfo.userId).lean()

  if(!user){
    res.status(401)
    throw new Error('Not Authorized - Super Admins Only')
  }

  if(user.role !== 'superadmin'){
    res.status(403)
    throw new Error('Not Authorized - Super Admins Only')
  }

  next()
})

