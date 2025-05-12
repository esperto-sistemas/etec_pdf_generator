import type { GeneratePDFBody } from 'types/PdfBody'

import { marginHorizontal, paddingBetweenColumns, spaceSignature, textColor } from '../constants'
import { drawHeader } from '../helpers'
import { fetchImage } from 'utils/fetchImage'

type RenderSignaturesData = Pick<GeneratePDFBody, 'cliente' | 'responsavel'>

export async function renderSignatures(
  doc: PDFKit.PDFDocument,
  currentY: number,
  data: RenderSignaturesData,
) {
  const halfWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  const lineHeight = 10
  const gap = 10
  const requiredHeight = spaceSignature + lineHeight + gap

  if (doc.y + requiredHeight > doc.page.height - 50) {
    doc.addPage()
    doc.y = 50
  }

  currentY = doc.y // Capture the current Y position after adding a new page

  drawHeader(doc, 'ASSINATURA DO CLIENTE', marginHorizontal, halfWidth)
  doc.y = currentY
  drawHeader(
    doc,
    'ASSINATURA DO TÉCNICO',
    marginHorizontal + halfWidth + paddingBetweenColumns,
    halfWidth,
  )

  // Draw the client and responsible signatures
  const clientSignature = await fetchImage(data.cliente.assinatura)
  const responsibleSignature = await fetchImage(data.responsavel.assinatura)

  const signatureX = (halfWidth - 100) / 2

  doc.image(clientSignature, marginHorizontal + signatureX, doc.y + 10, {
    width: 100,
    height: spaceSignature,
  })

  doc.image(
    responsibleSignature,
    marginHorizontal + halfWidth + paddingBetweenColumns + signatureX,
    doc.y + 10,
    { width: 100, height: spaceSignature },
  )

  // Draw the lines for the signatures
  const lineY = doc.y + spaceSignature + gap
  doc
    .lineWidth(0.5)
    .moveTo(marginHorizontal, lineY)
    .lineTo(marginHorizontal + halfWidth, lineY)
    .stroke(textColor)

  doc
    .lineWidth(0.5)
    .moveTo(marginHorizontal + halfWidth + paddingBetweenColumns, lineY)
    .lineTo(marginHorizontal + halfWidth * 2 + paddingBetweenColumns, lineY)
    .stroke(textColor)

  // Draw the names below the signatures
  doc.fontSize(8)
  doc.text(data.cliente.assinaturaNomeLegivel, marginHorizontal, lineY + lineHeight, {
    width: halfWidth,
    align: 'center',
  })
  doc.text(
    data.responsavel.nome,
    marginHorizontal + halfWidth + paddingBetweenColumns,
    lineY + lineHeight,
    { width: halfWidth, align: 'center' },
  )
}
