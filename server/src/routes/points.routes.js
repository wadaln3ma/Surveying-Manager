import { Router } from 'express'
import {
  addPoint,
  getPoint,
  getPoints,
  updatePoint,
  deletePoint,
  deleteAllTaskPoints,
} from '../controllers/points'
import { protectRoutes } from '../middlewares/auth.middleware'
import logger from '../utils/logger'

const router = Router()

router.use(protectRoutes)

/**
 *
 * @openapi
 *  tags:
 *    name: Points
 *    description: The Point managing API
 * */

/**
 *
 * @openapi
 *  /api/v1/points/:
 *    post:
 *      summary: Add new Point
 *      tags:
 *        - Points
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePointSchema'
 *      responses:
 *        201:
 *          description: Point Added Successfully
 *          schema:
 *            $ref: '#/components/schemas/PointResponseSchema'
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
 *
 * */

router.post('/', addPoint)

/**
 *
 * @openapi
 *  /api/v1/points/{id}:
 *    get:
 *      summary: Get a point by id
 *      tags:
 *        - Points
 *      parameters:
 *        - in : path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The id of the point
 *      responses:
 *        200:
 *          description: Get Point Successfull
 *          schema:
 *            $ref: '#/component/schemas/PointResponseSchema'
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
 *          description: Point not found
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

router.get('/point/:id', getPoint)
/**
 *
 * @openapi
 *  /api/v1/points/{taskName}:
 *    get:
 *      summary: Get All points of a given task
 *      tags:
 *        - Points
 *      parameters:
 *        - in : path
 *          name: taskName
 *          schema:
 *            type: string
 *          required: true
 *          description: The Task name which the points belongs to
 *      responses:
 *        200:
 *          description: Points fetched successfully
 *          schema:
 *            $ref: '#/components/schemas/PointsResponseSchema'
 *        400:
 *          description: Bad Request
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
 *          description: Points not found
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

router.get('/:taskName', getPoints)

/**
 *
 * @openapi
 *  /api/v1/points/{id}:
 *    patch:
 *      summary: update a single point from a task
 *      tags:
 *        - Points
 *      parameters:
 *        - in : path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the point to be updated
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PointSchema'
 *      responses:
 *        200:
 *          description: point updated successfully
 *          schema:
 *            $ref: '#/components/schemas/PointResponseSchema'
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
 *          description: Point not found
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

router.patch('/:id', updatePoint)

/**
 *
 * @openapi
 *  /api/v1/points/{id}:
 *    delete:
 *      summary: Delete a single point from a task
 *      tags:
 *        - Points
 *      parameters:
 *        - in : path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the point to be deleted
 *      responses:
 *        200:
 *          description: point deleted successfully
 *          schema:
 *            $ref: '#/components/schemas/PointResponseSchema'
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
 *          description: Point not found
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

router.delete('/:id', deletePoint)

/**
 *
 * @openapi
 *  /api/v1/points/{taskName}:
 *    delete:
 *      summary: Delete all  points of a task
 *      tags:
 *        - Points
 *      parameters:
 *        - in : path
 *          name: taskName
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the point to be deleted
 *      responses:
 *        200:
 *          description: points deleted successfully
 *          schema:
 *            $ref: '#/components/schemas/PointResponseSchema'
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
 *          description: Point not found
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

router.delete('/:taskName', deleteAllTaskPoints)


export default router
