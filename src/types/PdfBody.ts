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

const MaterialSchema = Type.Object({
  quantidade: Type.Number(),
  material: Type.Object({
    nome: Type.String(),
  }),
})

const DiaTrabalhadaSchema = Type.Object({
  data: Type.String(),
  horarios: Type.Array(
    Type.Object({
      horaInicial: Type.String(),
      horaFinal: Type.String(),
    }),
  ),
})

const ImagemSchema = Type.Object({
  imagem: Type.String(),
  mimeType: Type.String(),
})

const MaintenanceReportSchema = Type.Object({
  tipoRelatorio: Type.Literal('manutencao'),

  data: Type.String(),
  numero: Type.String(),

  cliente: ClienteSchema,
  responsavel: ResponsavelSchema,
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),

  descricaoAtividades: Type.String(),
  imagens: Type.Array(ImagemSchema),

  materiais: Type.Array(MaterialSchema),

  diasTrabalhados: Type.Array(DiaTrabalhadaSchema),
  quantidadeRefeicoes: Type.Number(),
  quantidadePedagios: Type.Number(),

  observacoes: Type.Optional(Type.String()),
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

  descricaoAtividades: Type.String(),
  imagens: Type.Array(ImagemSchema),

  observacoes: Type.Optional(Type.String()),
})

export const GeneratePDFSchema = Type.Union([VisitReportSchema, MaintenanceReportSchema])

export type MaintenanceReport = Static<typeof MaintenanceReportSchema>
export type VisitReport = Static<typeof VisitReportSchema>
export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
