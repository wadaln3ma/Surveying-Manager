import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

/**
 *
 * @openapi
 *  components:
 *    schemas:
 *      UserSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            default: 'jane doe'
 *          email:
 *            type: string
 *            default: 'jane.doe@mail.com'
 *          password:
 *            type: string
 *            default: 'pass123!'
 *          role:
 *            type: string
 *            default: user
 *      CreateUserSchema:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *            default: 'jane doe'
 *          email:
 *            type: string
 *            default: 'jane.doe@mail.com'
 *          password:
 *            type: string
 *            default: 'pass123!'
 *      LoginUserSchema:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            default: 'jane.doe@mail.com'
 *          password:
 *            type: string
 *            default: 'pass123!'
 *      SetUserRoleSchema:
 *        type: object
 *        required:
 *          - userId
 *          - role
 *        properties:
 *          userId:
 *            type: string
 *            default: '663yehhe7722u2uu'
 *          role:
 *            type: string
 *            default: 'admin'
 *      UserResponseSchema:
 *        type: object
 *        properties:
 *          accessToken:
 *            type: string
 *          expiresIn:
 *            type: string
 *          message:
 *            type: string
 *          succes:
 *            type: boolean
 *      UsersResponseSchema:
 *        type: object
 *        properties:
 *          users:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                schema:
 *                  $ref: '#/components/schemas/UserSchema'
 *          message:
 *            type: string
 *          succes:
 *            type: boolean
 *      ErrorResponseSchema:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          succes:
 *            type: boolean
 *            default: false
 *
 * */

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken:{
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
})

UserSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.isPasswordMatch = async function(enterd){
  return await bcrypt.compare(enterd, this.password)
}

const UserModel = model('user', UserSchema)

export default UserModel
