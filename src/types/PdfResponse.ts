import { Static, Type } from '@sinclair/typebox'

export const PdfResponseSchema = Type.Object({
  content: Type.String({ format: 'binary' }),
})

export type PdfResponse = Static<typeof PdfResponseSchema>
