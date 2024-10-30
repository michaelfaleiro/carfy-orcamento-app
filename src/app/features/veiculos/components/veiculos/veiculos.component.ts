import { Component } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { VeiculoService } from '../../services/veiculo.service';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../../interfaces/veiculo/veiculo';
import { CommonModule } from '@angular/common';
import { ModalVeiculoComponent } from '../modal-veiculo/modal-veiculo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../../interfaces/status';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [
    CommonModule,
    ModalVeiculoComponent,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
})
export class VeiculosComponent {
  veiculos$ = new Observable<Veiculo[]>();
  veiculoId: string = '';
  isModalVeiculo = false;
  statusList: Status[] = [];

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
    private veiculoService: VeiculoService,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.getAllVeiculos().subscribe({
      next: (veiculos: Veiculo[]) => {},
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
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
    this.getAllVeiculos(
      search,
      status,
      1,
      this.itemsPerPage,
      startDate,
      endDate,
      sort
    );
  }

  getAllVeiculos(
    search: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ): Observable<Veiculo[]> {
    return (this.veiculos$ = this.veiculoService.getAll(
      search,
      status,
      pageNumber,
      pageSize,
      startDate,
      endDate,
      sort
    ));
  }

  editVeiculo(veiculoId: string) {
    this.veiculoId = veiculoId;
    this.showModalVeiculo();
  }

  showModalVeiculo() {
    this.isModalVeiculo = !this.isModalVeiculo;
    if (!this.isModalVeiculo) {
      this.veiculoId = '';
    }
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
}
