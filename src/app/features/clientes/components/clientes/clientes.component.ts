import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ModalVeiculoComponent } from '../../../veiculos/components/modal-veiculo/modal-veiculo.component';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskPipe } from 'ngx-mask';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../../interfaces/status';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ModalClienteComponent,
    ModalVeiculoComponent,
    RouterLink,
    NgxPaginationModule,
    NgxMaskPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes$ = new Observable<Cliente[]>();
  clienteId: string = '';
  statusList: Status[] = [];
  isModalCliente = false;

  filtrosForm = new FormGroup({
    status: new FormControl(''),
    search: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    sort: new FormControl(''),
  });

  p = 1; // Página atual
  total: number = 0; // Total de itens
  itemsPerPage: number = 10;

  constructor(
    private clienteService: ClienteService,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.getAllClientes().subscribe({
      next: (clientes: Cliente[]) => {},
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
    this.getAllClientes(search, status, 1, 25, startDate, endDate, sort);
  }

  getAllClientes(
    search: string = '',
    status: string = '',
    pageNumber: number = 1,
    pageSize: number = 25,
    startDate: Date | string = '',
    endDate: Date | string = '',
    sort: string | string = ''
  ): Observable<Cliente[]> {
    return (this.clientes$ = this.clienteService.getAll(
      search,
      status,
      pageNumber,
      pageSize,
      startDate,
      endDate
    ));
  }

  editCliente(clienteId: string) {
    this.clienteId = clienteId;
    this.showModalCliente();
  }

  limparFiltros() {
    this.filtrosForm.reset();
    this.filtrosForm.get('status')?.setValue('');
    this.submit();
  }

  showModalCliente() {
    this.isModalCliente = !this.isModalCliente;
    if (!this.isModalCliente) {
      this.clienteId = '';
    }
  }

  convertDate(date: string): string {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0] + 'T00:00:00.000Z';
  }
}
