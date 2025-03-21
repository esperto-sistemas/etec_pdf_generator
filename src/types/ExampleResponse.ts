import { Type, Static } from "@sinclair/typebox";

export const ExampleResponseSchema = Type.Object(
  {
    message: Type.String(),
    data: Type.Object({
      name: Type.String(),
      age: Type.Number(),
      timestamp: Type.Number(),
    }),
  },
  { description: "Example response schema" }
);

export type ExampleResponse = Static<typeof ExampleResponseSchema>;
