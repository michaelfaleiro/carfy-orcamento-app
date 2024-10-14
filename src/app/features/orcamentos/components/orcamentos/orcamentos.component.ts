import { Component } from '@angular/core';
import { OrcamentoService } from '../../services/orcamento.service';
import { Observable } from 'rxjs';
import { Orcamento } from '../../../../interfaces/orcamento/orcamento';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalOrcamentoComponent } from '../modal-orcamento/modal-orcamento.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orcamentos',
  standalone: true,
  imports: [ModalOrcamentoComponent, CommonModule, RouterLink],
  templateUrl: './orcamentos.component.html',
  styleUrl: './orcamentos.component.css',
})
export class OrcamentosComponent {
  orcamentos$ = new Observable<Orcamento[]>();
  isModalOrcamento = false;
  orcamentoId: string = '';

  constructor(
    private orcamentoService: OrcamentoService,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.getAllOrcamentos().subscribe({
      next: (orcamentos: Orcamento[]) => {},
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  getAllOrcamentos(): Observable<Orcamento[]> {
    return (this.orcamentos$ = this.orcamentoService.getAll());
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
}
