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
  currentY = doc.y // Capture the current y position
  drawHeader(doc, 'ASSINATURA DO CLIENTE', marginHorizontal, halfWidth)
  doc.y = currentY // Restore the y position
  drawHeader(
    doc,
    'ASSINATURA DO TÉCNICO',
    marginHorizontal + halfWidth + paddingBetweenColumns,
    halfWidth,
  )

  // Draw the client and responsible signatures
  const clientSignature = await fetchImage(data.cliente.assinatura)
  doc.image(clientSignature, 100, doc.y + 5, {
    width: 100,
    height: 50,
  })
  const responsibleSignature = await fetchImage(data.responsavel.assinatura)
  doc.image(responsibleSignature, 100 + halfWidth + paddingBetweenColumns, doc.y + 5, {
    width: 100,
    height: 50,
  })

  // Draw the signature lines
  // Draw lines below the titles
  const lineY = doc.y + spaceSignature
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
}
