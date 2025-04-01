import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import {
  renderEquipment,
  renderExecutedActivities,
  renderObservations,
  renderSignatures,
} from './sections'

import { margin } from './constants'
import { drawText, spaceBetweenSections } from './helpers'
import { VisitReport } from 'types/PdfBody'

import { renderHeader } from './sections/header'
import { renderClient } from './sections/client'

export function visitReportPdf(reply: FastifyReply, body: VisitReport) {
  const doc = new PDFKit({ size: 'A4', margin })
  const currentY = doc.y

  // Pipe the PDF document to the response
  doc.pipe(reply.raw)

  doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf')
  doc.registerFont('Inter-Medium', 'src/assets/fonts/Inter-Medium.ttf')
  doc.registerFont('Inter-Regular', 'src/assets/fonts/Inter-Regular.ttf')

  renderHeader(doc, 'Relatório de VISITA', {
    data: body.data,
    numero: body.numero,
  })

  drawText(doc, 'Data da próxima visita: 20/04/2025', { continued: true })
  drawText(doc, 'Vendedor: Nome do vendedor', { align: 'right' })

  spaceBetweenSections(doc)

  //Client
  renderClient(doc, currentY, {
    cliente: body.cliente,
    nomeResponsavel: body.nomeResponsavel,
    responsavelSetor: body.responsavelSetor,
    cpfCnpj: body.cpfCnpj,
    telefone: body.telefone,
  })

  //Equipment
  renderEquipment(doc, currentY, true)

  //Executed activities
  renderExecutedActivities(doc, true)

  //Observations
  renderObservations(doc)

  //Signatures
  renderSignatures(doc, currentY)

  // Finish the PDF document
  doc.end()
}
