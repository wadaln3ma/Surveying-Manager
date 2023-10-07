import joi from 'joi'

export const UpsertPointSchema = joi.object({
  name: joi.string().required().trim().messages({
    'string.empty': 'Name field should not be empty',
    'any.required': 'Name Field is required',
  }),
  longitude: joi.string().required().trim().messages({
    'string.empty': 'Longitude field should not be empty',
    'any.required': 'Longitude Field is required',
  }),
  latitude: joi.string().required().trim().messages({
    'string.empty': 'Latitude field should not be empty',
    'any.required': 'Latitude Field is required',
  }),
  remarks: joi.optional().allow(""),
  taskName: joi.string().required().trim().messages({
    'string.empty': 'task name field should not be empty',
    'any.required': 'task name Field is required',
  }),
})
