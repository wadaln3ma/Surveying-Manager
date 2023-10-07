import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model'
import { REFRESH_TOKEN_SECRET,
         ACCESS_TOKEN_SECRET,
         NODE_ENV,
         ACCESS_TOKEN_TTL,
         REFRESH_TOKEN_TTL} from '../config'

export const genAccessToken = (userInfo)=>{

  const accessToken = jwt.sign(
    { userInfo },
    ACCESS_TOKEN_SECRET,
    {expiresIn: ACCESS_TOKEN_TTL}
  )

  const expiresIn = ACCESS_TOKEN_TTL.replace(/[^\d\.]*/g, '')

  return {accessToken, expiresIn}
}

export const genRefreshToken = async (userInfo, res)=>{
  const refreshToken = jwt.sign(
    {userInfo},
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL }
  )

  const user = await UserModel.findByIdAndUpdate(userInfo.userId, {
    refreshToken
  })

  if(!user){
    return res.status(400).json({
      message: 'User not found, try again',
      success: false
    })
  }

  const expiresIn = REFRESH_TOKEN_TTL.replace(/[^\d\.]*/g, '')

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV !== 'development',
    maxAge: expiresIn*24*60*60*1000
  })
}
