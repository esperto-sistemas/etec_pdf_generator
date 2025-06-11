import { Type, Static } from '@sinclair/typebox'

export const ErrorResponseSchema = Type.Object(
  {
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String(),
    fields: Type.Optional(
      Type.Array(
        Type.Object({
          path: Type.String(),
          message: Type.String(),
          value: Type.Any(),
        }),
      ),
    ),
  },
  { description: 'Error response schema' },
)

export type ErrorResponse = Static<typeof ErrorResponseSchema>
