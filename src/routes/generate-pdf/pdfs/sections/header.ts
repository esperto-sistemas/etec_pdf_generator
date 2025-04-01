import dayjs from 'dayjs'

import type { GeneratePDFBody } from 'types/PdfBody'

import { marginHorizontal, marginTop, paddingBetweenColumns } from '../constants'
import { drawSubtitle, drawText, drawTitle, spaceBetweenSections } from '../helpers'

type RenderHeaderData = Pick<GeneratePDFBody, 'data'>

export function renderHeader(doc: PDFKit.PDFDocument, title: string, data?: RenderHeaderData) {
  const logoWidth = 80

  doc.image('src/assets/images/logo.png', marginHorizontal, marginTop, {
    width: logoWidth,
    align: 'center',
  })

  const x = marginHorizontal + logoWidth + paddingBetweenColumns
  drawTitle(doc, title, x)
  doc.moveDown(0.5)
  drawSubtitle(doc, 'ETEC Comércio de Equipamentos Industriais LTDA')
  drawSubtitle(doc, 'Rua Marni Kuhn, 211 - Planalto - Carazinho/RS')
  drawSubtitle(doc, 'www.etec.ind.br | vendas@etec.ind.br | CNPJ 13.537.579/0001-78')

  doc.moveDown(1)
  doc.x = marginHorizontal
  drawText(doc, `Data: ${dayjs(data?.data).format('DD/MM/YYYY')}`, { continued: true })
  drawText(doc, 'Número: P 346', { align: 'right' })

  spaceBetweenSections(doc)
}
