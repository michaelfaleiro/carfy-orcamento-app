export interface AdicionarItemCotacaoRequest {
  id?: string;
  cotacaoId: string;
  sku: string;
  descricao: string;
  quantidade: number;
  tipoProduto: number;
}
