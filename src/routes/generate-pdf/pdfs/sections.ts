import { marginHorizontal, headerTextColor, paddingBetweenColumns } from './constants'
import { drawHeader, drawSubtitle, drawText, spaceBetweenSections } from './helpers'

export function renderEquipment(doc: PDFKit.PDFDocument, currentY: number, visit = false) {
  drawHeader(doc, 'EQUIPAMENTO')

  if (visit) {
    currentY = doc.y
    const columnWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
    drawSubtitle(doc, 'Descrição', { width: columnWidth, align: 'left' }, headerTextColor)

    doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
    doc.y = currentY
    drawSubtitle(doc, 'Quantidade', { width: columnWidth, align: 'left' }, headerTextColor)

    doc.moveDown(0.5)

    const equipmentDetails = [
      { description: 'Marca: Queimador', quantity: 3 },
      { description: 'Modelo: Baltur', quantity: 3 },
      { description: 'Estágio: x', quantity: 3 },
    ]

    equipmentDetails.forEach((detail) => {
      currentY = doc.y
      doc.x = marginHorizontal
      drawText(doc, detail.description, { width: columnWidth, align: 'left' })

      doc.y = currentY
      doc.x = marginHorizontal + columnWidth + paddingBetweenColumns
      drawText(doc, detail.quantity.toString(), { width: columnWidth, align: 'left' })

      doc.moveDown(0.5)
    })

    doc.moveDown(0.5)

    doc.x = marginHorizontal
    drawText(doc, 'Tipo de queimador: Gás natural', { continued: true })
    drawText(doc, 'Aplicação: Estufa de cura pó', { align: 'right' })
  } else {
    currentY = doc.y
    drawText(doc, 'Nome: Queimadores')
    doc.y = currentY
    drawText(doc, 'Marca: Baltur', { align: 'center' })
    doc.y = currentY
    drawText(doc, 'Modelo: B 1000', { align: 'right' })

    doc.moveDown(0.5)
    drawText(doc, 'Sem garantia', { continued: true })
    drawText(doc, 'Tipo de intervenção: Programada', { align: 'right' })
  }

  spaceBetweenSections(doc)
}

export function renderExecutedActivities(doc: PDFKit.PDFDocument, visit = false) {
  if (visit) doc.addPage()

  drawHeader(doc, 'ATIVIDADES EXECUTADAS')
  drawText(
    doc,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac diam ipsum. Ut cursus sed nisi quis placerat. Donec sollicitudin ultricies libero et volutpat. Quisque pretium luctus tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed nec urna pharetra, suscipit quam id, aliquet nunc.',
    { align: 'justify' },
  )
  doc.moveDown(1)

  const exampleImage = 'src/assets/images/image.png'
  const imageWidth = (doc.page.width - marginHorizontal * 2 - paddingBetweenColumns) / 2
  const imageHeight = 150

  // Images
  doc.image(exampleImage, marginHorizontal, doc.y, {
    width: imageWidth,
    height: imageHeight,
    align: 'center',
  })
  doc.image(exampleImage, marginHorizontal + imageWidth + paddingBetweenColumns, doc.y, {
    width: imageWidth,
    height: imageHeight,
    align: 'center',
  })
  doc.moveDown(2)
  doc.image(exampleImage, marginHorizontal, doc.y + imageHeight, {
    width: imageWidth,
    height: imageHeight,
    align: 'center',
  })
  doc.image(
    exampleImage,
    marginHorizontal + imageWidth + paddingBetweenColumns,
    doc.y + imageHeight,
    { width: imageWidth, height: imageHeight, align: 'center' },
  )

  // Move the y position down to avoid overlap
  doc.y = doc.y + imageHeight * 2 + paddingBetweenColumns
}
