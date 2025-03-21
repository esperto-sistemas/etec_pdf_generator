import { FastifyInstance } from 'fastify'
import { Type } from '@sinclair/typebox'
import { ErrorResponseSchema } from '../types/ErrorResponse'
import { check } from './health-check'

export async function routes(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        description: 'Health check endpoint',
        response: {
          200: Type.Object({ message: Type.String(), timestamp: Type.Number() }),
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    check,
  )
}

export default routes
