import { headerBackgroundColor, marginHorizontal, textColor, textColorLight } from './constants'

export function drawTitle(doc: PDFKit.PDFDocument, title: string, x: number = marginHorizontal) {
  doc.font('Inter-Bold').fontSize(16).fillColor(textColor).text(title, x)
}

export function drawSubtitle(
  doc: PDFKit.PDFDocument,
  subtitle: string,
  options?: PDFKit.Mixins.TextOptions,
  fillColor: string = textColorLight,
) {
  doc.font('Inter-Medium').fontSize(12).fillColor(fillColor).text(subtitle, options)
}

export function drawText(
  doc: PDFKit.PDFDocument,
  text: string,
  options?: PDFKit.Mixins.TextOptions,
) {
  doc.font('Inter-Medium').fontSize(12).fillColor(textColor).text(text, options)
}

export function drawHeader(
  doc: PDFKit.PDFDocument,
  title: string,
  x: number = marginHorizontal,
  width: number = doc.page.width - marginHorizontal * 2,
) {
  const rectY = doc.y
  const rectHeight = 23
  doc.rect(x, rectY, width, rectHeight).fill(headerBackgroundColor).stroke(headerBackgroundColor)
  doc
    .fillColor(textColor)
    .font('Inter-Medium')
    .fontSize(12)
    .text(title, x + 10, rectY + 5, {
      width: width - 20,
      align: 'center',
      height: rectHeight,
      ellipsis: true,
    })

  //Space between the header and the next content
  doc.moveDown(1)

  doc.x = marginHorizontal
}

export const spaceBetweenSections = (doc: PDFKit.PDFDocument) => {
  doc.moveDown(1)
}
