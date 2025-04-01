import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import {
  renderAddons,
  renderEquipment,
  renderExecutedActivities,
  renderMaterials,
  renderObservations,
  renderSignatures,
} from './sections'

import { margin } from './constants'
import { MaintenanceReport } from 'types/PdfBody'

import { renderHeader } from './sections/header'
import { renderClient } from './sections/client'

export function maintenanceReportPdF(reply: FastifyReply, body: MaintenanceReport) {
  const doc = new PDFKit({ size: 'A4', margin })
  const currentY = doc.y

  // Pipe the PDF document to the response
  doc.pipe(reply.raw)

  doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf')
  doc.registerFont('Inter-Medium', 'src/assets/fonts/Inter-Medium.ttf')
  doc.registerFont('Inter-Regular', 'src/assets/fonts/Inter-Regular.ttf')

  //Header
  renderHeader(doc, 'RELATÓRIO DE MANUTENÇÃO PREVENTIVA', {
    data: body.data,
    numero: body.numero,
  })

  //Client
  renderClient(doc, currentY, {
    cliente: body.cliente,
    nomeResponsavel: body.nomeResponsavel,
    responsavelSetor: body.responsavelSetor,
    cpfCnpj: body.cpfCnpj,
    telefone: body.telefone,
  })

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
