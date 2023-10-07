import swaggerUI from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import logger from './logger'
import { PORT } from '../config'

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Surveying Tasks API',
    version: '1.0.0',
    contact:{
      email : 'wadaln3ma@gmail.com'
    }
  },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
  servers:[
    {
      url: `http://localhost:${PORT}`,
    },
    {
      url: `https://surveyingmanagerapi.onrender.com`,
    },
  ]
}

const options = {
  definition,
  apis: ['./src/models/*.js', './src/routes/*.js']
}

const specs = swaggerJsdoc(options)

export const swaggerDocs = (app)=>{
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
  logger.info(`API Docs are available at http://localhost:${PORT}/api-docs`)
}
