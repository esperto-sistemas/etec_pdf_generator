import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import {
  renderAddons,
  renderClient,
  renderEquipment,
  renderExecutedActivities,
  renderHeader,
  renderMaterials,
  renderObservations,
  renderSignatures,
} from './sections'

import { margin } from './constants'

export function preventiveMaintenanceReportPdF(reply: FastifyReply) {
  const doc = new PDFKit({ size: 'A4', margin })
  const currentY = doc.y

  // Pipe the PDF document to the response
  doc.pipe(reply.raw)

  doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf')
  doc.registerFont('Inter-Medium', 'src/assets/fonts/Inter-Medium.ttf')
  doc.registerFont('Inter-Regular', 'src/assets/fonts/Inter-Regular.ttf')

  //Header
  renderHeader(doc, 'RELATÓRIO DE MANUTENÇÃO PREVENTIVA')

  //Client
  renderClient(doc, currentY)

  //Equipment
  renderEquipment(doc, currentY)

  //Executed activities
  renderExecutedActivities(doc)

  //Start new page
  doc.addPage()

  //Materials used
  renderMaterials(doc, currentY)

  //Addons
  renderAddons(doc)

  //Observations
  renderObservations(doc)

  //Signatures
  renderSignatures(doc, currentY)

  // Finish the PDF document
  doc.end()
}
