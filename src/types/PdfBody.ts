import { Static, Type } from '@sinclair/typebox'

const MaintenanceReportSchema = Type.Object({
  tipoRelatorio: Type.Literal('manutencao'),

  data: Type.String(),
  numero: Type.String(),
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),
  cpfCnpj: Type.String(),
  telefone: Type.String(),

  cliente: Type.Object({
    nome: Type.String(),
    assinatura: Type.String(),
  }),
  responsavel: Type.Object({
    nome: Type.String(),
    assinatura: Type.String(),
  }),
  //TODO: Add the rest of the properties for maintenance report
})

const VisitReportSchema = Type.Object({
  tipoRelatorio: Type.Literal('visita'),

  data: Type.String(),
  numero: Type.String(),
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),
  cpfCnpj: Type.String(),
  telefone: Type.String(),

  cliente: Type.Object({
    nome: Type.String(),
    assinatura: Type.String(),
  }),
  responsavel: Type.Object({
    nome: Type.String(),
    assinatura: Type.String(),
  }),
  //TODO: Add the rest of the properties for visit report
})

export const GeneratePDFSchema = Type.Union([VisitReportSchema, MaintenanceReportSchema])

export type MaintenanceReport = Static<typeof MaintenanceReportSchema>
export type VisitReport = Static<typeof VisitReportSchema>
export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
