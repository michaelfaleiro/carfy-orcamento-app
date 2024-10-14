import { CodigoEquivalente } from './codigoEquivalente';
import { PrecoItem } from './precoItem';

export interface ItemCotacao {
  id: string;
  cotacaoId: string;
  sku: string;
  descricao: string;
  quantidade: number;
  tipoProduto: number;
  precos: PrecoItem[];
  codigoEquivalentes: CodigoEquivalente[];
  createdAt: string;
  updatedAt: string;
}
