import { marginHorizontal, paddingBetweenColumns } from '../constants'
import { drawHeader, drawText } from '../helpers'

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
