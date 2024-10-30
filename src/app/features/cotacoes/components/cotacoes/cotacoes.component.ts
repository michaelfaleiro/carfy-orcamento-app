import { Component } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { CotacaoService } from '../../services/cotacao.service';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../interfaces/cotacao/cotacao';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../../interfaces/status';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule, ReactiveFormsModule],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css',
})
export class CotacoesComponent {
  cotacoes$ = new Observable<Cotacao[]>();
  statusList: Status[] = [];

  filtrosForm = new FormGroup({
    status: new FormControl(''),
    vendedor: new FormControl(''),
    search: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    sort: new FormControl(''),
  });

  p: number = 1; // Página atual
  total: number = 0; // Total de itens
  itemsPerPage: number = 10;

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

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
    const vendedor = this.filtrosForm.get('vendedor')?.value || '';
    this.getAllCotacoes(
      search,
      vendedor,
      status,
      1,
      25,
      startDate,
      endDate,
      sort
    );
  }

  ngOnInit(): void {
    this.carregarListaStatus();
    this.getAllCotacoes().subscribe({
      next: (cotacoes: Cotacao[]) => {},
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  getAllCotacoes(
    search: string = '',
    vendedor: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ): Observable<Cotacao[]> {
    return (this.cotacoes$ = this.cotacaoService.getCotacoes(
      search,
      vendedor,
      status,
      pageNumber,
      pageSize,
      startDate,
      endDate,
      sort
    ));
  }

  carregarListaStatus() {
    this.http
      .get<Status[]>('../../../../../assets/dados/statusCotacao.json')
      .subscribe((status) => {
        this.statusList = status;
      });
  }

  limparFiltros() {
    this.filtrosForm.reset();
    this.filtrosForm.get('status')?.setValue('');
    this.submit();
  }

  convertDate(date: string): string {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0] + 'T00:00:00.000Z';
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
