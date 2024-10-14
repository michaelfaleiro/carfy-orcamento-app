import { Routes } from '@angular/router';
import { OrcamentosComponent } from './features/orcamentos/components/orcamentos/orcamentos.component';
import { ClientesComponent } from './features/clientes/components/clientes/clientes.component';
import { VeiculosComponent } from './features/veiculos/components/veiculos/veiculos.component';
import { OrcamentoComponent } from './features/orcamentos/components/orcamento/orcamento.component';

export const routes: Routes = [
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
