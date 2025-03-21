import { FastifyInstance } from 'fastify'
import { Type } from '@sinclair/typebox'
import { ErrorResponseSchema } from '../types/ErrorResponse'
import { healthCheck } from './health-check'
import { generatePDF } from './generate-pdf'

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
    healthCheck,
  )

  app.post(
    '/generate-pdf',
    {
      schema: {
        description: 'Generate PDF endpoint',
        response: {
          200: Type.Object({ message: Type.String() }),
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    generatePDF,
  )
}

export default routes
