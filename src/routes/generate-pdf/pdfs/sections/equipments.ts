import { GeneratePDFBody } from 'types/PdfBody'
import { headerTextColor, marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawSubtitle, drawText, spaceBetweenSections } from '../helpers'

type RenderEquipmentData = Pick<
  GeneratePDFBody,
  | 'modelo'
  | 'garantia'
  | 'estagio'
  | 'tipoIntervencao'
  | 'tipoQueimador'
  | 'aplicacao'
  | 'equipamentoQuantidade'
  | 'quantidadeEstagio'
  | 'quantidadeMarca'
  | 'quantidadeModelo'
>

export function renderEquipment(
  doc: PDFKit.PDFDocument,
  currentY: number,
  visit = false,
  data: RenderEquipmentData,
) {
  drawHeader(doc, 'EQUIPAMENTO')

  const textGarantia = data.garantia === 'COM_GARANTIA' ? 'Com garantia' : 'Sem garantia'

  if (visit) {
    const estagio = (() => {
      switch (data.estagio) {
        case 'I_ESTAGIO':
          return '1º Estágio'
        case 'II_ESTAGIO':
          return '2º Estágio'
        case 'MODULANTE':
          return 'Modulante'
        default:
          return 'Não informado'
      }
    })()

    const textTipoQueimador = (() => {
      switch (data.tipoQueimador) {
        case 'GAS_GLP':
          return 'GLP'
        case 'GAS_NATURAL':
          return 'Gás natural'
        case 'DIESEL':
          return 'Diesel'
        default:
          return 'Não informado'
      }
    })()

    const textAplicacao = (() => {
      switch (data.aplicacao) {
        case 'ESTUFA_DE_CURA_PO':
          return 'Estufa de cura pó'
        case 'ESTUFA_DE_CURA_LIQUIDA':
          return 'Estufa de cura líquida'
        case 'BANHO':
          return 'Banho'
        case 'SECAGEM':
          return 'Secagem'
        case 'OUTROS':
          return 'Outros'
        default:
          return 'Não informado'
      }
    })()

    currentY = doc.y
    const columnWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
    drawSubtitle(doc, 'Descrição', { width: columnWidth, align: 'left' }, headerTextColor)

    doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
    doc.y = currentY
    drawSubtitle(doc, 'Quantidade', { width: columnWidth, align: 'left' }, headerTextColor)

    doc.moveDown(0.5)

    const equipmentDetails = [
      { description: `Marca: ${data.modelo.marca.nome}`, quantity: data.quantidadeMarca || 0 },
      { description: `Modelo: ${data.modelo.nome}`, quantity: data.quantidadeModelo || 0 },
      { description: `Estágio: ${estagio}`, quantity: data.quantidadeEstagio || 0 },
    ]

    equipmentDetails.forEach((detail) => {
      if (detail.quantity === 0) return

      currentY = doc.y
      doc.x = marginHorizontal
      drawText(doc, detail.description, { width: columnWidth, align: 'left' })

      doc.y = currentY
      doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
      drawText(doc, detail.quantity.toString(), { width: columnWidth, align: 'left' })

      doc.moveDown(0.5)
    })

    doc.x = marginHorizontal
    doc.moveDown(0.5)
    drawText(doc, `Tipo de queimador: ${textTipoQueimador}`, { continued: true })
    drawText(doc, `Aplicação: ${textAplicacao}`, { align: 'right' })
  } else {
    const textIntervencao = (() => {
      switch (data.tipoIntervencao) {
        case 'CHAMADA_EXTRA':
          return 'Chamada extra'
        case 'CONTRATO':
          return 'Contrato'
        case 'OFICINA':
          return 'Oficina'
        case 'PROGRAMADA':
          return 'Programada'
        default:
          return 'Não informado'
      }
    })()

    currentY = doc.y
    drawText(doc, `Nome: ${data.modelo.equipamento.nome}`)
    doc.y = currentY
    drawText(doc, `Marca: ${data.modelo.marca.nome}`, { align: 'center' })
    doc.y = currentY
    drawText(doc, `Modelo: ${data.modelo.nome}`, { align: 'right' })

    doc.moveDown(0.5)

    drawText(doc, textGarantia, { continued: true })
    drawText(doc, `Tipo de intervenção: ${textIntervencao}`, { align: 'right' })
  }

  spaceBetweenSections(doc)
}
