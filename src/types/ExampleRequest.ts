import { Type, Static } from "@sinclair/typebox";

export const ExampleRequestSchema = Type.Object(
  {
    name: Type.String(),
    age: Type.Number({ minimum: 0, maximum: 150 }),
  },
  { description: "Example request schema" }
);

export type ExampleRequest = Static<typeof ExampleRequestSchema>;
