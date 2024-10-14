import { Veiculo } from '../veiculo/veiculo';

export interface Cliente {
  id?: string;
  nomeRazaoSocial: string;
  nomeFantasia: string;
  cpfCnpj: string;
  rgIe: string;
  telefone: string;
  email: string;
  eTipoPessoa: number;
  observacao: string;
  veiculos?: Veiculo[];
}
