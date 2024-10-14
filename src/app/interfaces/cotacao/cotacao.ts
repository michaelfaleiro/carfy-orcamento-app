import { ItemCotacao } from './itemCotacao';

export interface Cotacao {
  id: string;
  orcamentoId: string;
  status: number;
  itens: ItemCotacao[];
  createdAt: string;
  updatedAt: string;
}
