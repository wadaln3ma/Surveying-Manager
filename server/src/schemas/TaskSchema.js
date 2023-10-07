import joi from 'joi'

export const UpsertTaskSchema = joi.object({
  name: joi.string().required().trim().messages({
    'string.empty': 'Name field should not be empty',
    'any.required': 'Name field is required',
  }),
  description: joi.string().trim(),
})
