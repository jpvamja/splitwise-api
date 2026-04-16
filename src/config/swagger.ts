import swaggerJsdoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'
import path from 'node:path'
import ENV from './env'
import { API_VERSION, APP_NAME } from '../constants'

const serverUrl = ENV.SWAGGER_SERVER_URL || `http://localhost:${ENV.PORT}`
const routeGlobs = [
  path.resolve(__dirname, '../routes/**/*.ts'),
  path.resolve(__dirname, '../routes/**/*.js')
]

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: APP_NAME,
      version: API_VERSION,
      description: 'API documentation for Splitwise backend'
    },
    servers: [{ url: serverUrl }]
  },
  apis: routeGlobs
}

export const swaggerSpec = swaggerJsdoc(options)

export const swaggerUiOptions: SwaggerUiOptions = {
  explorer: true,
  customSiteTitle: `${APP_NAME} Docs`
}
