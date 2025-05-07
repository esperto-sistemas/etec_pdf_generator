import { GeneratePDFBody } from 'types/PdfBody'
import { drawHeader, drawText, spaceBetweenSections } from '../helpers'

type RenderClientData = Pick<
  GeneratePDFBody,
  'cliente' | 'nomeResponsavelSetor' | 'responsavelSetor'
>

export function renderClient(doc: PDFKit.PDFDocument, currentY: number, data: RenderClientData) {
  const isCNPJ = data.cliente.cpfCnpj.replace(/\D/g, '').length === 14
  const textDocument = isCNPJ ? `CNPJ: ${data.cliente.cpfCnpj}` : `CPF: ${data.cliente.cpfCnpj}`

  drawHeader(doc, 'CLIENTE')
  drawText(doc, `Nome: ${data.cliente.nome}`, { continued: true })
  drawText(doc, textDocument, { align: 'right' })
  doc.moveDown(0.5)

  currentY = doc.y
  drawText(doc, `Responsável: ${data.nomeResponsavelSetor}`)
  doc.y = currentY
  drawText(doc, `Fone: ${data.cliente.telefone}`, { align: 'right' })

  doc.moveDown(0.5)
  drawText(doc, `Setor: ${data.responsavelSetor}`, { align: 'left' })

  spaceBetweenSections(doc)
}
