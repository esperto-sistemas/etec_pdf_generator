import { GeneratePDFBody } from 'types/PdfBody'
import { marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawText } from '../helpers'
import { fetchImage } from 'utils/fetchImage'

type RenderExecutedActivitiesData = Pick<GeneratePDFBody, 'descricaoAtividades' | 'imagens'>

export async function renderExecutedActivities(
  doc: PDFKit.PDFDocument,
  body: RenderExecutedActivitiesData,
) {
  const hasImages = body.imagens && body.imagens.length > 0

  drawHeader(doc, 'ATIVIDADES EXECUTADAS')
  drawText(doc, body.descricaoAtividades, { align: 'justify' })
  doc.moveDown(1)

  const imageWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  const imageHeight = 150
  const pageHeight = doc.page.height
  const marginVertical = 50 // Margem vertical para evitar sobreposição com o rodapé ou cabeçalho

  if (hasImages) {
    const imagesToRender = body.imagens
    const imagePromises = imagesToRender.map((image) => fetchImage(image.imagem))
    const images = await Promise.all(imagePromises)

    images.forEach((image, index) => {
      const x =
        index % 2 === 0 ? marginHorizontal : marginHorizontal + imageWidth + paddingBetweenColumns
      const y = doc.y

      // Verifica se há espaço suficiente na página atual
      if (y + imageHeight + marginVertical > pageHeight) {
        doc.addPage()
        doc.y = marginVertical // Reinicia a posição vertical na nova página
      }

      // Renderiza a imagem
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

    // Garante que a posição vertical seja ajustada após a última linha de imagens
    const remainingImages = images.length % 2 === 0 ? 0 : 1
    if (remainingImages > 0) {
      doc.y += imageHeight + paddingBetweenColumns
    }

    doc.moveDown(2) // Adiciona espaço após as imagens
  }
}
