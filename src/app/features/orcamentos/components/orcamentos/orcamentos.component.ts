import { Component } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { Orcamento } from '../../../../interfaces/orcamento/orcamento';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Status } from '../../../../interfaces/status';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orcamentos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalOrcamentoComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './orcamentos.component.html',
  styleUrl: './orcamentos.component.css',
})
export class OrcamentosComponent {
  orcamentos$ = new Observable<Orcamento[]>();
  isModalOrcamento = false;
  orcamentoId: string = '';
  statusList: Status[] = [];

  constructor(
    private orcamentoService: OrcamentoService,
    private message: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarListaStatus();
    this.getAllOrcamentos().subscribe({
      next: (orcamentos: Orcamento[]) => {},
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  getAllOrcamentos(status?: number): Observable<Orcamento[]> {
    return (this.orcamentos$ = this.orcamentoService.getAll(
      status?.toString()
    ));
  }

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = Number(selectElement.value);
    this.getAllOrcamentos(status);
  }

  editOrcamento(orcamentoId: string) {
    this.orcamentoId = orcamentoId;
    this.showModalOrcamento();
  }

  showModalOrcamento() {
    this.isModalOrcamento = !this.isModalOrcamento;
    if (!this.isModalOrcamento) {
      this.orcamentoId = '';
    }
  }

  carregarListaStatus() {
    this.http
      .get<Status[]>('../../../../../assets/dados/statusOrcamento.json')
      .subscribe((status) => {
        this.statusList = status;
      });
  }

  statusOrcamento(status: number): string {
    switch (status) {
      case 1:
        return 'Novo';
      case 2:
        return 'Finalizado';
      case 3:
        return 'Em Andamento';
      case 4:
        return 'Aguardando Cotação';
      case 5:
        return 'Negociação';
      case 6:
        return 'Fechamento';
      case 7:
        return 'Cliente Comprou Já Comprou';
      case 8:
        return 'Preço';
      case 9:
        return 'Prazo Encomenda';
      case 10:
        return 'Prazo de Entrega';
      case 11:
        return 'Problema no Pagamento';
      default:
        return 'Desconhecido';
    }
  }
}
