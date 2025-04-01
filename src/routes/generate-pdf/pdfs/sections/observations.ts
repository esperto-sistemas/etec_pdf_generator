import { drawHeader, drawText, spaceBetweenSections } from '../helpers'

type RenderObservationsData = {
  observacoes: string
}

export function renderObservations(doc: PDFKit.PDFDocument, data: RenderObservationsData) {
  drawHeader(doc, 'OBSERVAÇÕES')

  drawText(doc, data.observacoes, { align: 'justify' })

  spaceBetweenSections(doc)
}
