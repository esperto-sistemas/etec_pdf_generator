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
        description: 'Endpoint de health check (verifica se o serviço está ativo)',
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
    '/gerar-relatorio',
    {
      schema: {
        description: 'Endpoint para gerar PDF de relatórios',
        body: {
          type: 'object',
          properties: {
            tipoRelatorio: { type: 'string', enum: ['visita', 'manutencao'] },
            data: { type: 'string', format: 'date' },

            cliente: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                assinatura: { type: 'string' },
              },
              required: ['nome', 'assinatura'],
            },
            responsavel: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                assinatura: { type: 'string' },
              },
              required: ['nome', 'assinatura'],
            },
            nomeResponsavel: { type: 'string' },
            responsavelSetor: { type: 'string' },
            cpfCnpj: { type: 'string' },
            telefone: { type: 'string' },

            materiais: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  codigo: { type: 'number' },
                  quantidade: { type: 'number' },
                  material: {
                    type: 'object',
                    properties: {
                      codigo: { type: 'number' },
                      nome: { type: 'string' },
                    },
                    required: ['codigo', 'nome'],
                  },
                },
                required: ['codigo', 'quantidade', 'material'],
              },
            },

            diasTrabalhados: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  data: { type: 'string', format: 'date' },
                  horarios: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        horaInicial: { type: 'string' },
                        horaFinal: { type: 'string' },
                      },
                      required: ['horaInicial', 'horaFinal'],
                    },
                  },
                },
                required: ['data', 'horarios'],
              },
            },
            quantidadeRefeicoes: { type: 'number' },
            quantidadePedagios: { type: 'number' },

            observacoes: { type: 'string' },
          },
          required: ['tipoRelatorio'],
        },
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
