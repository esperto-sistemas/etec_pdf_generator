import { GeneratePDFBody } from 'types/PdfBody'
import { headerTextColor, marginHorizontal, paddingBetweenColumns } from '../constants'
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
  const hasThreeOrMoreImages = hasImages && body.imagens.length > 3

  if (!visit && hasThreeOrMoreImages && body.descricaoAtividades.length > 450) {
    body.descricaoAtividades = body.descricaoAtividades.substring(0, 450) + '...'
  }

  if (!visit && hasThreeOrMoreImages && body.descricaoAtividades.split('\n').length > 5) {
    const lines = body.descricaoAtividades.split('\n')
    body.descricaoAtividades = lines.slice(0, 5).join('\n') + '...'
  }

  drawHeader(doc, 'ATIVIDADES EXECUTADAS')
  drawText(doc, body.descricaoAtividades, { align: 'justify' })
  doc.moveDown(1)

  const imageWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  const imageHeight = 150

  if (hasImages) {
    const maxImages = 4
    const imagesToRender = body.imagens.slice(0, maxImages)
    const imagePromises = imagesToRender.map((image) => fetchImage(image.imagem))
    const images = await Promise.all(imagePromises)

    images.forEach((image, index) => {
      const x =
        index % 2 === 0 ? marginHorizontal : marginHorizontal + imageWidth + paddingBetweenColumns
      const y = doc.y + Math.floor(index / 2) * (imageHeight + paddingBetweenColumns)

      doc.image(image, x, y, {
        width: imageWidth,
        height: imageHeight,
        align: 'center',
      })
    })

    // Informativo caso existam mais imagens
    if (body.imagens.length > maxImages) {
      const movement = (imagesToRender.length / 2) * imageHeight + (paddingBetweenColumns + 10)
      console.log(movement)
      doc.y = doc.y + movement
      doc
        .font('Inter-Medium')
        .fontSize(8)
        .fillColor(headerTextColor)
        .text(`+ ${body.imagens.length - maxImages} imagem(ns) não exibida(s)`, { align: 'center' })
    }

    // Move the y position down to avoid overlap
    const movement = Math.ceil(imagesToRender.length / 2) * (imageHeight + paddingBetweenColumns)
    doc.y = doc.y + movement

    doc.moveDown(2)
  }
}
