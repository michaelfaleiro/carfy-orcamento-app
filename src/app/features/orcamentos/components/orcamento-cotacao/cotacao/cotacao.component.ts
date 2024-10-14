import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { CommonModule } from '@angular/common';
import { Cotacao } from '../../../../../interfaces/cotacao/cotacao';
import { CotacaoVendaDetalhesComponent } from '../cotacao-venda-detalhes/cotacao-venda-detalhes.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [CommonModule, CotacaoVendaDetalhesComponent],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  @Input() cotacoes: Cotacao[] = [];
  cotacaoId = '';
  isCotacaoVendaDetalhes = false;

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  detalhesCotacao(cotacao: Cotacao): void {
    this.cotacaoId = cotacao.id;
    this.showCotacaoVendaDetalhes();
  }

  showCotacaoVendaDetalhes(): void {
    this.isCotacaoVendaDetalhes = !this.isCotacaoVendaDetalhes;
  }
}
