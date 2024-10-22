import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalClienteComponent } from '../modal-cliente/modal-cliente.component';
import { ModalVeiculoComponent } from '../../../veiculos/components/modal-veiculo/modal-veiculo.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    ModalClienteComponent,
    ModalVeiculoComponent,
    RouterLink,
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  clientes$ = new Observable<Cliente[]>();
  clienteId: string = '';
  isModalCliente = false;
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

  getAllClientes(): Observable<Cliente[]> {
    return (this.clientes$ = this.clienteService.getAll());
  }

  editCliente(clienteId: string) {
    this.clienteId = clienteId;
    this.showModalCliente();
  }

  showModalCliente() {
    this.isModalCliente = !this.isModalCliente;
    if (!this.isModalCliente) {
      this.clienteId = '';
    }
  }
}
