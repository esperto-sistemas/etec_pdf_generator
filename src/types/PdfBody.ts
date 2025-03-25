import { Static, Type } from '@sinclair/typebox'

const VisitReportSchema = Type.Object({
  reportType: Type.Literal('visitReport'),
  //TODO: Add the rest of the properties for visit report
})

const PreventiveMaintenanceReportSchema = Type.Object({
  reportType: Type.Literal('preventiveMaintenanceReport'),
  //TODO: Add the rest of the properties for preventive maintenance report
})

export const GeneratePDFSchema = Type.Union([VisitReportSchema, PreventiveMaintenanceReportSchema])
export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
