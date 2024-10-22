import { Component } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { CotacaoService } from '../../services/cotacao.service';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao/cotacao';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css',
})
export class CotacoesComponent {
  cotacoes$ = new Observable<Cotacao[]>();

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllCotacoes().subscribe({
      next: (cotacoes: Cotacao[]) => {},
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  getAllCotacoes(): Observable<Cotacao[]> {
    return (this.cotacoes$ = this.cotacaoService.getCotacoes());
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
}
