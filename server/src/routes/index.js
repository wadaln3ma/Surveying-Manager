import { Router } from 'express'
import TasksRoutes from './tasks.routes'
import UsersRoutes from './users.routes'
import PointsRoutes from './points.routes'

const router = Router()

router.use('/users', UsersRoutes)

router.use('/tasks', TasksRoutes)

router.use('/points', PointsRoutes)

export default router
