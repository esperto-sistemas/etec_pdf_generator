import { FastifyReply, FastifyRequest } from 'fastify'

export function check(_: FastifyRequest, reply: FastifyReply) {
  try {
    return reply.status(200).send({
      message: 'Welcome to the PDF Generator API',
      timestamp: Date.now(),
    })
  } catch {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    })
  }
}
