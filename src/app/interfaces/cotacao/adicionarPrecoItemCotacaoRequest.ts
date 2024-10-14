export interface AdicionarPrecoItemCotacaoRequest {
  cotacaoId: string;
  itemId: string;
  fornecedorId: string;
  nomeFantasia: string;
  fabricanteId: string;
  fabricante: string;
  sku: string;
  nome: string;
  valorCusto: number;
  valorVenda: number;
  prazoExpedicao: number;
}
