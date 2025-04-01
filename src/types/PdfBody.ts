import { Static, Type } from '@sinclair/typebox'

const ClienteSchema = Type.Object({
  nome: Type.String(),
  cpfCnpj: Type.String(),
  telefone: Type.String(),
  assinatura: Type.String(),
})

const ResponsavelSchema = Type.Object({
  nome: Type.String(),
  assinatura: Type.String(),
})

const MaintenanceReportSchema = Type.Object({
  tipoRelatorio: Type.Literal('manutencao'),

  data: Type.String(),
  numero: Type.String(),

  cliente: ClienteSchema,
  responsavel: ResponsavelSchema,
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),

  materiais: Type.Array(
    Type.Object({
      codigo: Type.Number(),
      quantidade: Type.Number(),
      material: Type.Object({
        codigo: Type.Number(),
        nome: Type.String(),
      }),
    }),
  ),

  diasTrabalhados: Type.Array(
    Type.Object({
      data: Type.String(),
      horarios: Type.Array(
        Type.Object({
          horaInicial: Type.String(),
          horaFinal: Type.String(),
        }),
      ),
    }),
  ),
  quantidadeRefeicoes: Type.Number(),
  quantidadePedagios: Type.Number(),

  observacoes: Type.Optional(Type.String()),
  //TODO: Add the rest of the properties for maintenance report
})

const VisitReportSchema = Type.Object({
  tipoRelatorio: Type.Literal('visita'),

  data: Type.String(),
  numero: Type.String(),
  dataProximaVisita: Type.String(),

  cliente: ClienteSchema,
  responsavel: ResponsavelSchema,
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),

  observacoes: Type.Optional(Type.String()),
  //TODO: Add the rest of the properties for visit report
})

export const GeneratePDFSchema = Type.Union([VisitReportSchema, MaintenanceReportSchema])

export type MaintenanceReport = Static<typeof MaintenanceReportSchema>
export type VisitReport = Static<typeof VisitReportSchema>
export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
