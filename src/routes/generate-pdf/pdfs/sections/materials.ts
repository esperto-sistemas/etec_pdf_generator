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

  // Description and quantity
  currentY = doc.y
  const columnWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  drawSubtitle(doc, 'Descrição', { width: columnWidth, align: 'left' }, headerTextColor)

  doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
  doc.y = currentY
  drawSubtitle(doc, 'Quantidade', { width: columnWidth, align: 'left' }, headerTextColor)

  doc.moveDown(0.5)

  data.materiais.forEach((material) => {
    currentY = doc.y
    doc.x = marginHorizontal
    drawText(doc, material.material.nome, { width: columnWidth, align: 'left' })

    doc.y = currentY
    doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
    drawText(doc, material.quantidade.toString(), { width: columnWidth, align: 'left' })

    doc.moveDown(0.5)
  })

  spaceBetweenSections(doc)
}
