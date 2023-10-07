import { Router } from 'express'
import { signup,
         login,
         logout,
         getUsers,
         deleteUser,
         setUserRole,
         refreshAccessToken } from '../controllers/users'
import { protectRoutes,
         adminsOnly } from '../middlewares/auth.middleware'

const router = Router()

/**
 *
 * @openapi
 *   tags:
 *     name: Users
 *     description: Users managing API
 * */

/**
 *
 * @openapi
 *  /api/v1/users/signup:
 *    post:
 *      summary: Register a new user
 *      tags:
 *        - Users
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserSchema'
 *      responses:
 *        201:
 *          description: user registerd successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponseSchema'
 *        400:
 *          description: Bad Request
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

router.post('/signup', signup)

/**
 *
 * @openapi
 *  /api/v1/users/login:
 *    post:
 *      summary: login user sets refresh token cookie and returns access token
 *      tags:
 *        - Users
 *      requestBody:
 *        type: object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserSchema'
 *      responses:
 *        200:
 *          description: user logged in successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: User Not Found
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

router.post('/login', login)

/**
 *
 * @openapi
 *  /api/v1/users/logout:
 *    get:
 *      summary: logout a user
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: user logged out seccussfully
 *          content:
 *            application/josn:
 *              schema:
 *                $ref: '#/components/schemas/UserResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: User Not found
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
 *        500:
 *          description: Server Error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *
 * */

router.get('/logout', protectRoutes, logout)

/**
 *
 * @openapi
 *  /api/v1/users/refreshToken:
 *    get:
 *      summary: return new access token
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: access token generated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: Not Found
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

router.get('/refreshToken', refreshAccessToken)

/**
 *
 * @openapi
 *  /api/v1/users:
 *    get:
 *      summary: Get Users
 *      tags:
 *        - Users
 *      responses:
 *        200:
 *          description: users fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UsersResponseSchema'
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

router.get('/', protectRoutes, adminsOnly, getUsers)

/**
 *
 * @openapi
 *  /api/v1/users/{id}:
 *    delete:
 *      summary: Delete a user
 *      tags:
 *        - Users
 *      parameters:
 *        - in : path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: id of the user to be deleted
 *      responses:
 *        200:
 *          description: Ok - user delete seccussfully
 *          content:
 *            application/josn:
 *              schema:
 *                $ref: '#/components/schemas/UserResponseSchema'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponseSchema'
 *        404:
 *          description: User Not found
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

router.delete('/:id', deleteUser)

/**
 *
 * @openapi
 *  /api/v1/users/set-role:
 *    patch:
 *      summary: Set user role
 *      tags:
 *        - Users
 *      requestBody:
 *        type: object
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SetUserRoleSchema'
 *      responses:
 *        200:
 *          description: user role updated - ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserSchema'
 *        422:
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

router.patch('/set-role', protectRoutes, adminsOnly, setUserRole)

export default router
