import { headerTextColor, marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawSubtitle, drawText, spaceBetweenSections } from '../helpers'

import type { GeneratePDFBody } from 'types/PdfBody'

type RenderMaterialsData = Pick<GeneratePDFBody, 'materiais'>

export function renderMaterials(
  doc: PDFKit.PDFDocument,
  currentY: number,
  data: RenderMaterialsData,
) {
  //@ts-expect-error - PDFKit does not have a type definition for _pageBuffer
  const isFirstPage = doc._pageBuffer && doc._pageBuffer.length === 1
  if (isFirstPage) doc.addPage()

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
    // Salvar posição Y inicial
    currentY = doc.y
    // Renderizar a descrição primeiro
    doc.x = marginHorizontal

    drawText(doc, material.material.nome, {
      width: columnWidth,
      align: 'left',
      continued: false,
      lineBreak: true,
    })

    // Salvar a posição do cursor após desenhar o texto
    const afterTextY = doc.y

    // Voltar para a posição inicial para desenhar a quantidade
    doc.y = currentY
    doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
    drawText(doc, material.quantidade.toString(), { width: columnWidth, align: 'left' })

    // Definir a posição Y para a maior entre a posição após o texto da descrição e após a quantidade
    doc.y = Math.max(afterTextY, doc.y)
    doc.moveDown(0.5)
  })

  spaceBetweenSections(doc)
}
