export interface AdicionarItemAvulsoOrcamentoRequest {
  itemAvulsoId?: string;
  orcamentoId: string;
  fabricanteId: string;
  fabricante: string;
  sku: string;
  descricao: string;
  valorVenda: number;
  quantidade: number;
}
