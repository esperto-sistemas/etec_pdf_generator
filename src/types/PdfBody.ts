import { Static, Type } from '@sinclair/typebox'

const ClienteSchema = Type.Object({
  nome: Type.String(),
  cpfCnpj: Type.String(),
  telefone: Type.String(),
  assinatura: Type.String(),
  assinaturaNomeLegivel: Type.String(),
})

const ResponsavelSchema = Type.Object({
  nome: Type.String(),
  assinatura: Type.String(),
})

const ModeloSchema = Type.Object({
  nome: Type.String(),
  equipamento: Type.Object({ nome: Type.String() }),
  marca: Type.Object({ nome: Type.String() }),
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

const EstagioSchema = Type.Union([
  Type.Literal('I_ESTAGIO'),
  Type.Literal('II_ESTAGIO'),
  Type.Literal('MODULANTE'),
])

const TipoQueimadorSchema = Type.Union([
  Type.Literal('GAS_GLP'),
  Type.Literal('GAS_NATURAL'),
  Type.Literal('DIESEL'),
])

const TipoInvervencaoSchema = Type.Union([
  Type.Literal('PROGRAMADA'),
  Type.Literal('CHAMADA_EXTRA'),
  Type.Literal('CONTRATO'),
  Type.Literal('OFICINA'),
])

const AplicacaoSchema = Type.Union([
  Type.Literal('ESTUFA_DE_CURA_PO'),
  Type.Literal('ESTUFA_DE_CURA_LIQUIDA'),
  Type.Literal('BANHO'),
  Type.Literal('SECAGEM'),
  Type.Literal('OUTROS'),
])

export const GeneratePDFSchema = Type.Object({
  tipoRelatorio: Type.Union([
    Type.Literal('MANUTENCAO'),
    Type.Literal('CORRETIVA'),
    Type.Literal('PREVENTIVA'),
    Type.Literal('VISITA'),
  ]),

  data: Type.String(),
  numero: Type.Optional(Type.String()),
  dataProximaVisita: Type.Optional(Type.String()),

  cliente: ClienteSchema,
  responsavel: ResponsavelSchema,
  nomeResponsavel: Type.String(),
  responsavelSetor: Type.String(),

  modelo: ModeloSchema,
  garantia: Type.Union([Type.Literal('COM_GARANTIA'), Type.Literal('SEM_GARANTIA')]),
  estagio: Type.Optional(EstagioSchema),
  tipoQueimador: Type.Optional(TipoQueimadorSchema),
  aplicacao: Type.Optional(AplicacaoSchema),
  tipoIntervencao: Type.Optional(TipoInvervencaoSchema),
  equipamentoQuantidade: Type.Optional(Type.Number()),

  descricaoAtividades: Type.String(),
  imagens: Type.Array(ImagemSchema),

  materiais: Type.Array(MaterialSchema),

  diasTrabalhados: Type.Array(DiaTrabalhadaSchema),
  quantidadeRefeicoes: Type.Number(),
  quantidadePedagios: Type.Number(),

  observacoes: Type.Optional(Type.String()),
})

export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
