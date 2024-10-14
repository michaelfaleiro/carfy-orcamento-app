export interface ItemAvulso {
  id: string;
  orcamentoId: string;
  fabricanteId: string;
  fabricante: string;
  sku: string;
  descricao: string;
  valorVenda: number;
  quantidade: number;
  createdAt: string;
  updatedAt?: string;
}
