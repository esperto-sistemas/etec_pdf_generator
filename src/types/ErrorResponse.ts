import { Type, Static } from "@sinclair/typebox";

export const ErrorResponseSchema = Type.Object(
  {
    statusCode: Type.Number(),
    error: Type.String(),
    message: Type.String(),
  },
  { description: "Error response schema" }
);

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
