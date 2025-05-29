import { Static, TSchema, Type } from '@sinclair/typebox'

function Optional<T extends TSchema>(schema: T) {
  return Type.Optional(Type.Union([schema, Type.Null()]))
}

const ClienteSchema = Type.Object({
  nome: Type.String(),
  cpfCnpj: Type.String(),
  telefone: Type.String(),
  assinatura: Type.String(),
  assinaturaNomeLegivel: Type.String(),
  assinaturaData: Type.String(),
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
  localizacao: Optional(Type.String()),
  material: Type.Object({
    nome: Type.String(),
  }),
})

const DiasTrabalhadosSchema = Type.Object({
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

const GarantiaSchema = Type.Union([Type.Literal('COM_GARANTIA'), Type.Literal('SEM_GARANTIA')])

export const GeneratePDFSchema = Type.Object({
  tipoRelatorio: Type.Union([
    Type.Literal('MANUTENCAO'),
    Type.Literal('CORRETIVA'),
    Type.Literal('PREVENTIVA'),
    Type.Literal('VISITA'),
  ]),

  data: Type.String(),
  numero: Optional(Type.String()),
  dataProximaVisita: Optional(Type.String()),

  cliente: ClienteSchema,
  responsavel: ResponsavelSchema,
  nomeResponsavelSetor: Type.String(),
  responsavelSetor: Type.String(),

  modelo: ModeloSchema,
  quantidadeMarca: Optional(Type.Number()),
  quantidadeModelo: Optional(Type.Number()),
  quantidadeEstagio: Optional(Type.Number()),

  garantia: Optional(GarantiaSchema),
  estagio: Optional(EstagioSchema),
  tipoQueimador: Optional(TipoQueimadorSchema),
  aplicacao: Optional(AplicacaoSchema),
  tipoIntervencao: Optional(TipoInvervencaoSchema),
  equipamentoQuantidade: Optional(Type.Number()),

  descricaoAtividades: Type.String(),
  imagens: Type.Array(ImagemSchema),

  materiais: Type.Array(MaterialSchema),

  diasTrabalhados: Type.Array(DiasTrabalhadosSchema),
  quantidadeRefeicoes: Type.Number(),
  quantidadePedagios: Type.Number(),

  observacoes: Optional(Type.String()),
})

export type GeneratePDFBody = Static<typeof GeneratePDFSchema>
