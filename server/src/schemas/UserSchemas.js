import joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

export const CreateUserSchema = joi.object({
  name: joi.string().min(2).max(30).trim().required().messages({
    'string.empty': 'Name Field should not be empty',
    'string.min': 'Name should be at least 2 characters',
    'string.max': 'Name should not be more than 30 characters',
    'any.required': 'Name Field is required',
  }),
  email: joi.string().email().lowercase().trim().required().messages({
    'string.empty': 'Email Field should not be empty',
    'string.email': 'Please Enter a valid Email',
    'any.required': 'Email Field is required',
  }),
  password: passwordComplexity().trim().required().messages({
    'string.empty': 'Password Field should not be empty',
    'passwordComplexity.tooShort': 'Password should be at least 8 characters',
    'passwordComplexity.lowercase': 'Password should contain at least one lowercase character',
    'passwordComplexity.uppercase': 'Password should contain at least one uppercase character',
    'passwordComplexity.numeric': 'Password should contain at least one number',
    'passwordComplexity.symbol': 'Password should contain at least one special character',
    'any.required': 'Password Field is required',
  }),
})

export const LoginUserSchema = joi.object({
  email: joi.string().email().required().lowercase().trim().messages({
    'string.empty': 'Email Field should not be empty',
    'string.email': 'Please Enter a valid Email',
    'any.required': 'Email Field is required',
  }),
  password: joi.string().required().trim().messages({
    'string.empty': 'Password Field should not be empty',
    'any.required': 'Password Field is required',
  }),
})
