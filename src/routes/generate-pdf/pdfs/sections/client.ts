import { GeneratePDFBody } from 'types/PdfBody'
import { drawHeader, drawText, spaceBetweenSections } from '../helpers'

type RenderClientData = Pick<
  GeneratePDFBody,
  'cliente' | 'nomeResponsavel' | 'responsavelSetor' | 'cpfCnpj' | 'telefone'
>

export function renderClient(doc: PDFKit.PDFDocument, currentY: number, data: RenderClientData) {
  const isCNPJ = data.cpfCnpj.replace(/\D/g, '').length === 14
  const textDocument = isCNPJ ? `CNPJ: ${data.cpfCnpj}` : `CPF: ${data.cpfCnpj}`

  drawHeader(doc, 'CLIENTE')
  drawText(doc, `Nome: ${data.cliente.nome}`, { continued: true })
  drawText(doc, textDocument, { align: 'right' })
  doc.moveDown(0.5)
  currentY = doc.y
  drawText(doc, `Responsável: ${data.nomeResponsavel}`)
  doc.y = currentY
  drawText(doc, `Setor: ${data.responsavelSetor}`, { align: 'center' })
  doc.y = currentY
  drawText(doc, `Fone: ${data.telefone}`, { align: 'right' })

  spaceBetweenSections(doc)
}
