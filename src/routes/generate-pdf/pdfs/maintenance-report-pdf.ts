import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import { renderEquipment, renderExecutedActivities } from './sections'

import { margin } from './constants'
import { MaintenanceReport } from 'types/PdfBody'

import { renderHeader } from './sections/header'
import { renderClient } from './sections/client'
import { renderAddons } from './sections/addons'
import { renderMaterials } from './sections/materials'
import { renderSignatures } from './sections/signatures'
import { renderObservations } from './sections/observations'

export async function maintenanceReportPdF(reply: FastifyReply, body: MaintenanceReport) {
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
  })

  //Equipment
  renderEquipment(doc, currentY)

  //Executed activities
  renderExecutedActivities(doc)

  //Start new page
  doc.addPage()

  //Materials used
  if (body.materiais.length > 0) {
    renderMaterials(doc, currentY, {
      materiais: body.materiais,
    })
  }

  //Addons
  renderAddons(doc, {
    quantidadePedagios: body.quantidadePedagios,
    quantidadeRefeicoes: body.quantidadeRefeicoes,
    diasTrabalhados: body.diasTrabalhados,
  })

  //Observations
  if (body.observacoes) {
    renderObservations(doc, { observacoes: body.observacoes })
  }

  //Signatures
  await renderSignatures(doc, currentY, {
    cliente: body.cliente,
    responsavel: body.responsavel,
  })

  // Finish the PDF document
  doc.end()
}
