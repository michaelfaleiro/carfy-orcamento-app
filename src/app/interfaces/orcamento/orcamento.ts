import { Cliente } from '../cliente/cliente';
import { Cotacao } from '../cotacao/cotacao';
import { Item } from '../item/item';
import { ItemAvulso } from '../item/itemAvulso';
import { Veiculo } from '../veiculo/veiculo';

export interface Orcamento {
  id: string;
  cliente: Cliente;
  veiculo: Veiculo;
  vendedor: string;
  status: number;
  itens: Item[];
  itensAvulsos: ItemAvulso[];
  cotacoes: Cotacao[];
  cupomDesconto: number;
  valorDesconto: number;
  totalProdutos: number;
  valorFrete: number;
  observacao: string;
  observacaoInterna: string;
  createdAt: string;
  updatedAt?: string;
}
