export interface AdicionarPrecoItemCotacaoRequest {
  Id?: string;
  cotacaoId: string;
  itemId: string;
  fornecedorId: string;
  fornecedor: string;
  fabricanteId: string;
  fabricante: string;
  quantidade: number;
  sku: string;
  descricao: string;
  valorCusto: number;
  valorVenda: number;
  prazoExpedicao: number;
  observacao: string;
}
