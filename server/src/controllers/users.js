import UserModel from '../models/user.model'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { CreateUserSchema } from '../schemas/UserSchemas'
import { genAccessToken,
         genRefreshToken } from '../utils/genToken'
import { REFRESH_TOKEN_SECRET } from '../config'

// allowed users roles
const allowedRoles = ['user', 'admin', 'superadmin']

// Register a New User
export const signup = asyncHandler(async (req, res)=>{
  //const { name, email, password } = req.body
  //
  const result = await CreateUserSchema.validateAsync(req.body)

  const { name, email, password } = result

  const exists = await UserModel.findOne({email})

  if(exists){
    res.status(400)
    throw new Error('user allredy exists')
  }

  const user = await UserModel.create({name, email, password})

  if(!user){
    res.status(500)
    throw new Error('Couldn\'t register user, please try again ')
  }

  const userInfo = {
    userId: user._id,
    name: user.name,
    role: user.role
  }

  await genRefreshToken(userInfo, res)

  const {accessToken, expiresIn} = genAccessToken(userInfo)

  res.status(201).json({
    accessToken,
    expiresIn,
    message: 'user registerd successfully',
    success: true
  })
})

// Log User In
export const login = asyncHandler(async (req, res)=>{
  const { email, password } = req.body

  const user = await UserModel.findOne({email})

  if(!user){
    res.status(400)
    throw new Error('Invalid Credentials')
  }

  if(!await (user.isPasswordMatch(password))){
    res.status(400)
    throw new Error('Invalid Credentials')
  }

  const userInfo = {
    userId: user._id,
    name: user.name,
    role: user.role
  }

  await genRefreshToken(userInfo, res)

  const {accessToken, expiresIn} = genAccessToken(userInfo)

  res.status(200).json({
    accessToken,
    expiresIn,
    message: 'you logged in seccessfully',
    success: true
  })
})

// Log User Out
export const logout = asyncHandler(async(req, res)=>{
  const refreshToken = req.cookies.refreshToken
  const user = await UserModel.findOne({refreshToken})
  await UserModel.findByIdAndUpdate(user._id, {
    refreshToken: ''
  })

  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({
    message: 'you logged out seccessfully',
    seccuss: true
  })
})

// Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res)=>{
  const refreshToken = req.cookies?.refreshToken

  if(!refreshToken){
    res.status(401)
    throw new Error('Not authorized - No refresh token')
  }

  const currentUser = await UserModel.findOne({refreshToken}).lean()

  try{
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)

    if(!decoded.userInfo.userId === currentUser._id){
      res.status(403)
      throw new Error('Not Authorized - Bad Token')
    }

    const userInfo = {
      userId: currentUser._id,
      name: currentUser.name,
      role: currentUser.role
    }

    const {accessToken, expiresIn} = genAccessToken(userInfo)

    res.status(200).json({
      accessToken,
      expiresIn,
      message: 'access token generated successfully',
      success: true
    })
  }catch(err){
    res.status(401)
    throw new Error('Not Authorized - Bad Token!')
  }
})

// Get Users Handler
export const getUsers = asyncHandler(async (req, res)=>{
  const users = await UserModel.find({}).select(['-password', '-refreshToken']).lean()

  res.status(200).json({
    users,
    message: 'users fetched successfully',
    success: true
  })
})

// Delete a user hanlder
export const deleteUser = asyncHandler(async (req, res)=>{
  const { id } = req.params

  if(!Types.ObjectId.isValid(id)){
    res.status(404)
    throw new Error('No such a user in DB')
  }
  const user = await UserModel.findByIdAndDelete(id)

  if(!user){
    res.status(404)
    throw new Error('User not found')
  }

  res.status(200).json({
    user,
    message: 'User deleted successfully',
    success: true
  })
})

// Set User Role
export const setUserRole = asyncHandler(async (req, res)=>{

  const { userId, role } = req.body

  if(!Types.ObjectId.isValid(userId)){
    res.status(422)
    throw new Error('No Such a user')
  }

  if(!allowedRoles.includes(role)){
    res.status(422)
    throw new Error('This role is not allowed')
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, {
    role
  })

  if(!updatedUser){
    res.status(500)
    throw new Error('Couldn\'t change user role, please try again')
  }

  res.status(200).json({
    user: updatedUser,
    message: 'User role updated successfully',
    success: true
  })
})


