import { Routes } from '@angular/router';
import { OrcamentosComponent } from './features/orcamentos/components/orcamentos/orcamentos.component';
import { ClientesComponent } from './features/clientes/components/clientes/clientes.component';
import { VeiculosComponent } from './features/veiculos/components/veiculos/veiculos.component';
import { OrcamentoComponent } from './features/orcamentos/components/orcamento/orcamento.component';
import { CotacoesComponent } from './features/cotacoes/components/cotacoes/cotacoes.component';
import { CotacaoComponent } from './features/cotacoes/components/cotacao/cotacao.component';
import { ClienteDetalhesComponent } from './features/clientes/components/cliente-detalhes/cliente-detalhes.component';

export const routes: Routes = [
  {
    path: 'cotacao/:id',
    component: CotacaoComponent,
    title: 'Cotação',
  },
  {
    path: 'cotacoes',
    component: CotacoesComponent,
    title: 'Cotações',
  },
  {
    path: 'orcamento/:id',
    component: OrcamentoComponent,
    title: 'Orçamento',
  },
  {
    path: 'orcamentos',
    component: OrcamentosComponent,
    title: 'Orçamentos',
  },
  {
    path: 'cliente/:id',
    component: ClienteDetalhesComponent,
    title: 'Cliente',
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    title: 'Clientes',
  },
  {
    path: 'veiculos',
    component: VeiculosComponent,
    title: 'Veículos',
  },
];
