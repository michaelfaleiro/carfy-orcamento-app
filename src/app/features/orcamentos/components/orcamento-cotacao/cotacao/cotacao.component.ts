import { Component, Input } from '@angular/core';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { CommonModule } from '@angular/common';
import { Cotacao } from '../../../../../interfaces/cotacao/cotacao';
import { CotacaoVendaDetalhesComponent } from '../cotacao-venda-detalhes/cotacao-venda-detalhes.component';
import { ActivatedRoute } from '@angular/router';
import { RegisterCotacaoRequest } from '../../../../../interfaces/cotacao/registerCotacaoRequest';

@Component({
  selector: 'app-cotacao',
  standalone: true,
  imports: [CommonModule, CotacaoVendaDetalhesComponent],
  templateUrl: './cotacao.component.html',
  styleUrl: './cotacao.component.css',
})
export class CotacaoComponent {
  @Input() cotacoes: Cotacao[] = [];
  orcamentoId = '';
  cotacaoId = '';
  isCotacaoVendaDetalhes = false;

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orcamentoId = this.route.snapshot.paramMap.get('id')!;
  }

  createCotacao() {
    const registerCotacao: RegisterCotacaoRequest = {
      orcamentoId: this.orcamentoId,
      status: 1,
    };
    this.cotacaoService.createCotacao(registerCotacao).subscribe({
      next: (cotacao) => {
        this.messageService.success('Cotacão criada com sucesso');
        this.detalhesCotacao(cotacao);
      },
      error: (error) => {
        this.messageService.error(error.error.errrors[0]);
      },
    });
  }

  detalhesCotacao(cotacao: Cotacao): void {
    this.cotacaoId = cotacao.id;
    this.showCotacaoVendaDetalhes();
  }

  statusCotacao(status: number): string {
    switch (status) {
      case 1:
        return 'Nova';
      case 2:
        return 'Em Andamento';
      case 3:
        return 'Enviada';
      case 4:
        return 'Repondida Parcial';
      case 5:
        return 'Finalizada';
      case 6:
        return 'Cancelada';
      default:
        return '';
    }
  }

  showCotacaoVendaDetalhes(): void {
    this.isCotacaoVendaDetalhes = !this.isCotacaoVendaDetalhes;
  }
}
