import { FastifyReply, FastifyRequest } from 'fastify'
import { Value } from '@sinclair/typebox/value'

import { GeneratePDFBody, GeneratePDFSchema } from 'types/PdfBody'

import { visitReportPdf } from './pdfs/visit-report-pdf'
import { maintenanceReportPdF } from './pdfs/maintenance-report-pdf'

export function generatePDF(req: FastifyRequest<{ Body: GeneratePDFBody }>, reply: FastifyReply) {
  try {
    const validationResult = Value.Check(GeneratePDFSchema, req.body)

    if (!validationResult) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Requisição inválida',
        message: 'O corpo da requisição não atende ao formato esperado.',
      })
    }

    const { tipoRelatorio } = req.body

    reply.header('Content-Type', 'application/pdf')
    reply.header('Content-Disposition', 'attachment; filename="report.pdf"')

    switch (tipoRelatorio) {
      case 'PREVENTIVA':
        maintenanceReportPdF(reply, req.body, 'RELATÓRIO DE MANUTENÇÃO PREVENTIVA')
        break
      case 'CORRETIVA':
        maintenanceReportPdF(reply, req.body, 'RELATÓRIO DE MANUTENÇÃO CORRETIVA')
        break
      case 'MANUTENCAO':
        maintenanceReportPdF(reply, req.body, 'RELATÓRIO DE MANUTENÇÃO')
        break
      case 'VISITA':
        visitReportPdf(reply, req.body)
        break
      default:
        return reply.status(400).send({
          statusCode: 400,
          error: 'Requisição inválida',
          message: 'Tipo de relatório não suportado.',
        })
    }
  } catch {
    reply.status(500).send({
      statusCode: 500,
      error: 'Erro interno do servidor',
      message: 'Um erro inesperado ocorreu, tente novamente mais tarde.',
    })
  }
}
