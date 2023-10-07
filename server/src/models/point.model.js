import { Schema, model } from 'mongoose'

/**
 *
 * @openapi
 *  components:
 *    schemas:
 *      PointSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          longitude:
 *            type: string
 *          latitude:
 *            type: string
 *          remarks:
 *            type: string
 *          taskName:
 *            type: string
 *      CreatePointSchema:
 *        type: object
 *        required:
 *          - name
 *          - longitude
 *          - latitude
 *        properties:
 *          name:
 *            type: string
 *            default: '23-123'
 *          longitude:
 *            type: string
 *            default: '26.000'
 *          latitude:
 *            type: string
 *            default: '48.000'
 *          remarks:
 *            type: string
 *            default: 'Cool Remarks'
 *          taskName:
 *            type: string
 *            default: 'task'
 *      PointResponseSchema:
 *        type: object
 *        properties:
 *          point:
 *            type: object
 *            properties:
 *              schema:
 *                $ref: '#/components/schemas/PointSchema'
 *          message:
 *            type: string
 *          success:
 *            type: boolean
 *      PointsResponseSchema:
 *        type: object
 *        properties:
 *          point:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                schema:
 *                  $ref: '#/components/schemas/PointSchema'
 *          message:
 *            type: string
 *          success:
 *            type: boolean

 * */

const PointSchema = new Schema({
  name : {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  remarks:{
    type: String,
  },
  taskName: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const PointModel = model('point', PointSchema)

export default PointModel
