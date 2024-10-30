import { Veiculo } from '../veiculo/veiculo';
import { ItemCotacao } from './itemCotacao';

export interface Cotacao {
  id: string;
  orcamentoId: string;
  veiculo: Veiculo;
  status: number;
  itens: ItemCotacao[];
  createdAt: string;
  updatedAt: string;
}
