import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import { margin } from './constants'
import { drawText, spaceBetweenSections } from './helpers'
import type { GeneratePDFBody } from 'types/PdfBody'

import { renderHeader } from './sections/header'
import { renderClient } from './sections/client'
import { renderEquipment } from './sections/equipments'
import { renderSignatures } from './sections/signatures'
import { renderObservations } from './sections/observations'
import { renderExecutedActivities } from './sections/executedActivities'
import dayjs from 'dayjs'

export async function visitReportPdf(reply: FastifyReply, body: GeneratePDFBody) {
  const doc = new PDFKit({ size: 'A4', margin })
  const currentY = doc.y

  doc.pipe(reply.raw)

  doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf')
  doc.registerFont('Inter-Medium', 'src/assets/fonts/Inter-Medium.ttf')
  doc.registerFont('Inter-Regular', 'src/assets/fonts/Inter-Regular.ttf')

  renderHeader(doc, 'RELATÓRIO DE VISITA', {
    data: body.data,
    numero: body.numero,
  })

  drawText(doc, `Data da próxima visita: ${dayjs(body.dataProximaVisita).format('DD/MM/YYYY')}`, {
    continued: true,
  })
  drawText(doc, `Vendedor: ${body.responsavel.nome}`, { align: 'right' })

  spaceBetweenSections(doc)

  //Client
  renderClient(doc, currentY, {
    cliente: body.cliente,
    nomeResponsavelSetor: body.nomeResponsavelSetor,
    responsavelSetor: body.responsavelSetor,
  })

  //Equipment
  renderEquipment(doc, currentY, true, {
    modelo: body.modelo,
    estagio: body.estagio,
    garantia: body.garantia,
    aplicacao: body.aplicacao,
    tipoQueimador: body.tipoQueimador,
    tipoIntervencao: body.tipoIntervencao,
    equipamentoQuantidade: body.equipamentoQuantidade,
    quantidadeEstagio: body.quantidadeEstagio,
    quantidadeMarca: body.quantidadeMarca,
    quantidadeModelo: body.quantidadeModelo,
  })

  //Executed activities
  await renderExecutedActivities(doc, true, {
    descricaoAtividades: body.descricaoAtividades,
    imagens: body.imagens,
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
