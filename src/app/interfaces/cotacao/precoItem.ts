export interface PrecoItem {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}
