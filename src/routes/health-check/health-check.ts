import { FastifyReply, FastifyRequest } from 'fastify'

export function healthCheck(_: FastifyRequest, reply: FastifyReply) {
  try {
    return reply.status(200).send({
      message: 'Serviço está ativo!',
      timestamp: Date.now(),
    })
  } catch {
    reply.status(500).send({
      statusCode: 500,
      error: 'Erro interno do servidor',
      message: 'Um erro inesperado ocorreu, tente novamente mais tarde.',
    })
  }
}
