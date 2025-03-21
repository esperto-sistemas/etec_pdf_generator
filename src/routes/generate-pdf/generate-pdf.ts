import { FastifyReply, FastifyRequest } from 'fastify'
import {
  //preventiveMaintenanceReportPdF,
  visitReportPdf,
} from './pdfs/visit-report-pdf'

export function generatePDF(req: FastifyRequest, reply: FastifyReply) {
  try {
    // Set the response headers for PDF
    reply.header('Content-Type', 'application/pdf')
    reply.header('Content-Disposition', 'attachment; filename="generated.pdf"')

    // preventiveMaintenanceReportPdF(reply)
    visitReportPdf(reply)
  } catch {
    // Handle errors
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while generating the PDF.',
    })
  }
}
