import { MaintenanceReport } from 'types/PdfBody'
import { drawHeader, drawSubtitle, drawText, spaceBetweenSections } from '../helpers'
import dayjs from 'dayjs'
import { headerTextColor } from '../constants'

type RenderAddonsData = Pick<
  MaintenanceReport,
  'diasTrabalhados' | 'quantidadePedagios' | 'quantidadeRefeicoes'
>

export function renderAddons(doc: PDFKit.PDFDocument, data: RenderAddonsData) {
  drawHeader(doc, 'ADICIONAIS')

  if (data.diasTrabalhados.length > 0) {
    data.diasTrabalhados.forEach((dia) => {
      drawSubtitle(doc, `Dia: ${dayjs(dia.data).format('DD/MM/YYYY')}`, {}, headerTextColor)
      dia.horarios.forEach((horario, index) => {
        doc.moveDown(0.5)
        drawText(doc, `Horário inicial: ${horario.horaInicial}`, { continued: true })
        drawText(doc, `Horário final: ${horario.horaFinal}`, { align: 'right' })

        if (index === dia.horarios.length - 1) {
          doc.moveDown(0.5)
          doc
            .lineWidth(0.5)
            .moveTo(doc.x, doc.y)
            .lineTo(doc.page.width - doc.x, doc.y)
            .stroke()
          doc.moveDown(0.5)
        }
      })
    })
  }

  if (data.quantidadeRefeicoes > 0) {
    drawText(doc, 'Refeições: Sim', { continued: true })
    drawText(doc, `Quantidade: ${data.quantidadeRefeicoes}`, { align: 'right' })
  }

  if (data.quantidadePedagios > 0) {
    doc.moveDown(0.5)
    drawText(doc, 'Pedágios: Sim', { continued: true })
    drawText(doc, `Quantidade: ${data.quantidadePedagios}`, { align: 'right' })
  }

  spaceBetweenSections(doc)
}
