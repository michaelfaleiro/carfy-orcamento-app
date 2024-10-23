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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-orcamentos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalOrcamentoComponent,
    CommonModule,
    RouterLink,
    NgxPaginationModule,
  ],
  templateUrl: './orcamentos.component.html',
  styleUrl: './orcamentos.component.css',
})
export class OrcamentosComponent {
  orcamentos$ = new Observable<Orcamento[]>();
  isModalOrcamento = false;
  orcamentoId: string = '';
  statusList: Status[] = [];
  listaOrcamentos: Orcamento[] = [];

  filtrosForm = new FormGroup({
    status: new FormControl(''),
    search: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    sort: new FormControl(''),
  });

  p: number = 1; // Página atual
  total: number = 0; // Total de itens
  itemsPerPage: number = 10;

  constructor(
    private orcamentoService: OrcamentoService,
    private message: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarListaStatus();
    this.loadOrcamentos();
  }

  submit() {
    const search = this.filtrosForm.get('search')?.value || '';
    const status = this.filtrosForm.get('status')?.value || '';
    const startDate = this.convertDate(
      this.filtrosForm.get('startDate')?.value || ''
    );
    const endDate = this.convertDate(
      this.filtrosForm.get('endDate')?.value || ''
    );
    const sort = this.filtrosForm.get('sort')?.value || '';
    this.loadOrcamentos(search, status, 1, 10, startDate, endDate, sort);
  }

  loadOrcamentos(
    search: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ) {
    this.orcamentoService
      .getAll(search, status, pageNumber, pageSize, startDate, endDate, sort)
      .subscribe((orcamentos) => {
        this.listaOrcamentos = orcamentos;
        this.total = orcamentos.length;
      });
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

  convertDate(date: string): string {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0] + 'T00:00:00.000Z';
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
