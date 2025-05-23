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
            tipoRelatorio: {
              type: 'string',
              enum: ['MANUTENCAO', 'CORRETIVA', 'PREVENTIVA', 'VISITA'],
            },
            data: { type: 'string', format: 'date' },

            cliente: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                cpfCnpj: { type: 'string' },
                telefone: { type: 'string' },
                assinatura: { type: 'string' },
                assinaturaNomeLegivel: { type: 'string' },
              },
              required: ['nome', 'cpfCnpj', 'telefone', 'assinatura', 'assinaturaNomeLegivel'],
            },
            responsavel: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                assinatura: { type: 'string' },
              },
              required: ['nome', 'assinatura'],
            },
            nomeResponsavelSetor: { type: 'string' },
            responsavelSetor: { type: 'string' },

            modelo: {
              type: 'object',
              properties: {
                nome: { type: 'string' },
                equipamento: {
                  type: 'object',
                  properties: { nome: { type: 'string' } },
                  required: ['nome'],
                },
                marca: {
                  type: 'object',
                  properties: { nome: { type: 'string' } },
                  required: ['nome'],
                },
              },
              required: ['nome', 'equipamento', 'marca'],
            },
            quantidadeMarca: { type: 'number' },
            quantidadeModelo: { type: 'number' },
            quantidadeEstagio: { type: 'number' },
            garantia: {
              type: 'string',
              enum: ['COM_GARANTIA', 'SEM_GARANTIA', null],
              nullable: true,
            },
            estagio: {
              type: 'string',
              enum: ['I_ESTAGIO', 'II_ESTAGIO', 'MODULANTE', null],
              nullable: true,
            },
            tipoQueimador: {
              type: 'string',
              enum: ['GAS_GLP', 'GAS_NATURAL', 'DIESEL', null],
              nullable: true,
            },
            aplicacao: {
              type: 'string',
              enum: ['ESTUFA_DE_CURA_PO', 'ESTUFA_DE_CURA_LIQUIDA', 'BANHO', 'SECAGEM', 'OUTROS', null],
              nullable: true,
            },
            tipoIntervencao: {
              type: 'string',
              enum: ['PROGRAMADA', 'CHAMADA_EXTRA', 'CONTRATO', 'OFICINA', null],
              nullable: true,
            },
            equipamentoQuantidade: { type: 'number' },

            descricaoAtividades: { type: 'string' },
            imagens: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  imagem: { type: 'string' },
                  mimeType: { type: 'string' },
                },
                required: ['imagem'],
              },
            },

            materiais: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  quantidade: { type: 'number' },
                  material: {
                    type: 'object',
                    properties: {
                      nome: { type: 'string' },
                    },
                    required: ['nome'],
                  },
                },
                required: ['quantidade', 'material'],
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
          required: ['tipoRelatorio', 'data', 'cliente', 'modelo', 'descricaoAtividades'],
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
