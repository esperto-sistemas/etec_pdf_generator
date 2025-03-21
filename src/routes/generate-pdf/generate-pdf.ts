import { FastifyReply, FastifyRequest } from 'fastify'
import PDFKit from 'pdfkit'

export function generatePDF(req: FastifyRequest, reply: FastifyReply) {
  try {
    const doc = new PDFKit()

    // Set the response headers for PDF
    reply.header('Content-Type', 'application/pdf')
    reply.header('Content-Disposition', 'attachment; filename="generated.pdf"')

    // Pipe the PDF document to the response
    doc.pipe(reply.raw)

    // Add content to the PDF
    doc.fontSize(25).text('Hello, this is a generated PDF!', 100, 100)
    doc.text('This is a sample PDF document generated using PDFKit.', 100, 150)

    // Finalize the PDF and end the stream
    doc.end()
  } catch {
    // Handle errors
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while generating the PDF.',
    })
  }
}
