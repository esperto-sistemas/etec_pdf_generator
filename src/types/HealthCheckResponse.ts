import { Static, Type } from '@sinclair/typebox'

export const HealthCheckResponseSchema = Type.Object({
  message: Type.String(),
  timestamp: Type.Number(),
})

export type HealthCheckResponse = Static<typeof HealthCheckResponseSchema>
