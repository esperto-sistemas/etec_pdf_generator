import { FastifyInstance } from 'fastify'

import { ErrorResponseSchema } from 'types/ErrorResponse'
import { HealthCheckResponseSchema } from 'types/HealthCheckResponse'
import { PdfResponseSchema } from 'types/PdfResponse'

import { healthCheck } from './health-check/health-check'
import { generatePDF } from './generate-pdf/generate-pdf'

export async function routes(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        description: 'Health check endpoint',
        response: {
          200: HealthCheckResponseSchema,
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
          200: PdfResponseSchema,
          400: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    generatePDF,
  )
}

export default routes
