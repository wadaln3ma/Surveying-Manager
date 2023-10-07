import { Schema, model } from 'mongoose'

/**
 *
 * @openapi
 *  components:
 *    schemas:
 *      TaskSchema:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *      CreateTaskSchema:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            default: 'task'
 *          description:
 *            type: string
 *            default: 'Cool Description'
 *      TaskResponseSchema:
 *        type: object
 *        properties:
 *          task:
 *            type: object
 *            properties:
 *              schema:
 *                $ref: '#/components/schemas/TaskSchema'
 *          message:
 *            type: string
 *          success:
 *            type: boolean
 *      AllTasksResponseSchema:
 *        type: object
 *        properties:
 *          tasks:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                schema:
 *                  $ref: '#/components/schemas/TaskSchema'
 *          message:
 *            type: string
 *          success:
 *            type: boolean
 *      TasksResponseSchema:
 *        type: object
 *        properties:
 *          tasks:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                schema:
 *                  $ref: '#/components/schemas/TaskSchema'
 *          pagination:
 *            type: object
 *          message:
 *            type: string
 *          success:
 *            type: boolean
 *
 * */

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  userId:{
    type: String,
    required: true
  },
}, { timestamps: true })

const TaskModel = model('task', TaskSchema)

export default TaskModel
