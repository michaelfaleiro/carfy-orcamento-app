export interface AdicionarCodigoEquivalenteRequest {
  id?: string;
  cotacaoId: string;
  itemId: string;
  sku: string;
  fabricanteId: string;
  fabricante: string;
  tipoProdutoEquivalente: number;
}
