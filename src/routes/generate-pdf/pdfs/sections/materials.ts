import { headerTextColor, marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawSubtitle, drawText, spaceBetweenSections } from '../helpers'

import type { GeneratePDFBody } from 'types/PdfBody'

type RenderMaterialsData = Pick<GeneratePDFBody, 'materiais'>

export function renderMaterials(
  doc: PDFKit.PDFDocument,
  currentY: number,
  data: RenderMaterialsData,
) {
  drawHeader(doc, 'MATERIAIS UTILIZADOS')

  const hasLocation = data.materiais.some((m) => (m.localizacao?.trim()?.length || 0) > 0)

  // Description, quantity and location
  currentY = doc.y
  const columnCount = hasLocation ? 3 : 2
  const columnWidth =
    (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns * (columnCount - 1)) /
    columnCount

  drawSubtitle(doc, 'Descrição', { width: columnWidth, align: 'left' }, headerTextColor)

  doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
  doc.y = currentY
  drawSubtitle(doc, 'Quantidade', { width: columnWidth, align: 'left' }, headerTextColor)

  if (hasLocation) {
    doc.x = marginHorizontal + (columnWidth + paddingBetweenColumns) * 2
    doc.y = currentY
    drawSubtitle(doc, 'Localização', { width: columnWidth, align: 'left' }, headerTextColor)
  }

  doc.moveDown(0.5)

  data.materiais.forEach((material) => {
    currentY = doc.y
    doc.x = marginHorizontal

    drawText(doc, material.material.nome, {
      width: columnWidth,
      align: 'left',
      continued: false,
      lineBreak: true,
    })

    const afterTextY = doc.y

    doc.y = currentY
    doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
    drawText(doc, material.quantidade.toString(), { width: columnWidth, align: 'left' })

    if (hasLocation) {
      doc.y = currentY
      doc.x = marginHorizontal + (columnWidth + paddingBetweenColumns) * 2
      drawText(doc, material.localizacao || '', { width: columnWidth, align: 'left' })
    }

    doc.y = Math.max(afterTextY, doc.y)
    doc.moveDown(0.5)
  })

  spaceBetweenSections(doc)
}
