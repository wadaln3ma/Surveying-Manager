import { Router } from 'express'
import {
  addTask,
  getTask,
  getPaginatedTasks,
  updateTask,
  deleteTask,
  downloadCsv
} from '../controllers/tasks'
import { protectRoutes } from '../middlewares/auth.middleware'
import logger from '../utils/logger'

const router = Router()

// protect user routes
router.use(protectRoutes)

/**
 *
 * @openapi
 *  tags:
 *    name: Tasks
 *    description: Task managing API
 *
 * */

/**
 *
 * @openapi
 *  /api/v1/tasks/:
 *    post:
 *      summary: Add New Task
 *      tags:
 *        - Tasks
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTaskSchema'
 *      responses:
 *        201:
 *          description: Task Created Successfully
 *          schema:
 *            $ref: '#/components/schemas/TaskResponeSchema'
 *        409:
 *          description: Conflict
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 * */

router.post('/', addTask)

/**
 *
 * @openapi
 *  /api/v1/tasks/task/{id}:
 *    get:
 *      summary: get a single task by id
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in : path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the task to be searched
 *      responses:
 *        200:
 *          description: task found successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: task not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *
 * */

router.get('/task/:id', getTask)

/**
 *
 * @openapi
 *  /api/v1/tasks/{term}:
 *    get:
 *      summary: Return paginated tasks and search for tasks by a given term
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in : path
 *          name: term
 *          required: true
 *          schema:
 *            type: string
 *          description: term that tasks to be filterd with
 *        - in : query
 *          name: items_per_page
 *          required: true
 *          schema:
 *            type: number
 *          description: number of items to be fetched
 *        - in : query
 *          name: page
 *          required: true
 *          schema:
 *            type: number
 *          description: page number
 *      responses:
 *        200:
 *          description: tasks found successfully
 *          schema:
 *            $ref: '#/components/schemas/TasksResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: tasks not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *

 * */

router.get('/:term', getPaginatedTasks)

/**
 *
 * @openapi
 *  /api/v1/tasks/{id}:
 *    patch:
 *      summary: update a task
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the task to be updated
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateTaskSchema'
 *      responses:
 *        200:
 *          description: task updated successfully
 *          schema:
 *            $ref: '#/components/schemas/sResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: task not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *

 * */

router.patch('/:id', updateTask)

/**
 *
 * @openapi
 *  /api/v1/tasks/{id}:
 *    delete:
 *      summary: Delete a single tasks with its points
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the task to be deleted
 *      responses:
 *        200:
 *          description: task deleted successfully
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: task not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *

 * */

router.delete('/:id', deleteTask)
/**
 *
 * @openapi
 *  /api/v1/tasks/download/{taskName}:
 *    get:
 *      summary: Download Task Point as CSV file
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in: path
 *          name: taskName
 *          required: true
 *          schema:
 *            type: string
 *          description: name of the task to be downloaded
 *      responses:
 *        200:
 *          description: task downloaded successfully
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        401:
 *          description: Not Authenticated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        403:
 *          description: Not Authorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: task not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *
 * */

router.get('/download/:taskName', downloadCsv)

export default router
