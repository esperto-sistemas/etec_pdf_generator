import { GeneratePDFBody } from 'types/PdfBody'
import { marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawText } from '../helpers'
import { fetchImage } from 'utils/fetchImage'

type RenderExecutedActivitiesData = Pick<GeneratePDFBody, 'descricaoAtividades' | 'imagens'>

export async function renderExecutedActivities(
  doc: PDFKit.PDFDocument,
  visit = false,
  body: RenderExecutedActivitiesData,
) {
  if (visit) doc.addPage()

  const hasImages = body.imagens && body.imagens.length > 0

  drawHeader(doc, 'ATIVIDADES EXECUTADAS')
  drawText(doc, body.descricaoAtividades, { align: 'justify' })
  doc.moveDown(1)

  const imageWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  const imageHeight = 150

  if (hasImages) {
    const imagesToRender = body.imagens
    const imagePromises = imagesToRender.map((image) => fetchImage(image.imagem))
    const images = await Promise.all(imagePromises)
    const pageHeight = doc.page.height
    const marginVertical = 50 // Margem vertical para evitar sobreposição com o rodapé ou cabeçalho

    images.forEach((image, index) => {
      const x =
        index % 2 === 0 ? marginHorizontal : marginHorizontal + imageWidth + paddingBetweenColumns
      const y = doc.y + Math.floor(index / 2) * (imageHeight + paddingBetweenColumns)

      // Verifica se há espaço suficiente na página atual
      if (y + imageHeight + marginVertical > pageHeight) {
        doc.addPage()
        doc.y = marginVertical // Reinicia a posição vertical na nova página
      }

      doc.image(image, x, doc.y, {
        width: imageWidth,
        height: imageHeight,
        align: 'center',
      })

      // Atualiza a posição vertical para a próxima imagem
      if (index % 2 !== 0) {
        doc.y += imageHeight + paddingBetweenColumns
      }
    })

    doc.moveDown(2)
  }
}
