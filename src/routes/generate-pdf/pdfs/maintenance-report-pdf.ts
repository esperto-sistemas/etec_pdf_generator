import { FastifyReply } from 'fastify'

import PDFKit from 'pdfkit'

import { margin } from './constants'
import type { GeneratePDFBody } from 'types/PdfBody'

import { renderHeader } from './sections/header'
import { renderClient } from './sections/client'
import { renderAddons } from './sections/addons'
import { renderMaterials } from './sections/materials'
import { renderEquipment } from './sections/equipments'
import { renderSignatures } from './sections/signatures'
import { renderObservations } from './sections/observations'
import { renderExecutedActivities } from './sections/executedActivities'

export async function maintenanceReportPdF(
  reply: FastifyReply,
  body: GeneratePDFBody,
  title: string,
) {
  const doc = new PDFKit({ size: 'A4', margin })
  const currentY = doc.y

  doc.pipe(reply.raw)

  doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf')
  doc.registerFont('Inter-Medium', 'src/assets/fonts/Inter-Medium.ttf')
  doc.registerFont('Inter-Regular', 'src/assets/fonts/Inter-Regular.ttf')

  //Header
  renderHeader(doc, title, {
    data: body.data,
    numero: body.numero,
  })

  //Client
  renderClient(doc, currentY, {
    cliente: body.cliente,
    nomeResponsavelSetor: body.nomeResponsavelSetor,
    responsavelSetor: body.responsavelSetor,
  })

  //Equipment
  renderEquipment(doc, currentY, false, {
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
  await renderExecutedActivities(doc, false, {
    descricaoAtividades: body.descricaoAtividades,
    imagens: body.imagens,
  })

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
