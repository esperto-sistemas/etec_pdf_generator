import { FastifyReply, FastifyRequest } from 'fastify'

import type { GeneratePDFBody } from 'types/PdfBody'

import { visitReportPdf } from './pdfs/visit-report-pdf'
import { preventiveMaintenanceReportPdF } from './pdfs/preventive-maintenance-report-pdf'

export function generatePDF(req: FastifyRequest<{ Body: GeneratePDFBody }>, reply: FastifyReply) {
  try {
    const { reportType } = req.body

    if (!reportType) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'reportType is required',
      })
    }

    reply.header('Content-Type', 'application/pdf')
    reply.header('Content-Disposition', 'attachment; filename="report.pdf"')

    switch (reportType) {
      case 'visitReport':
        visitReportPdf(reply)
        break
      case 'preventiveMaintenanceReport':
        preventiveMaintenanceReportPdF(reply)
        break
    }
  } catch {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while generating the PDF.',
    })
  }
}
