import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalVeiculoComponent } from '../../../veiculos/components/modal-veiculo/modal-veiculo.component';

@Component({
  selector: 'app-cliente-detalhes',
  standalone: true,
  imports: [CommonModule, NgxMaskPipe, ModalVeiculoComponent],
  templateUrl: './cliente-detalhes.component.html',
  styleUrl: './cliente-detalhes.component.css',
})
export class ClienteDetalhesComponent {
  clienteId = '';
  cliente$ = new Observable<Cliente>();
  isModalVeiculo = false;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clienteId = this.route.snapshot.paramMap.get('id')!;
    if (this.clienteId) {
      this.getCliente(this.clienteId);
    } else {
      this.messageService.error('Cliente não encontrado');
    }
  }

  getCliente(id: string) {
    this.cliente$ = this.clienteService.getById(id);
  }

  showModalVeiculo() {
    this.isModalVeiculo = !this.isModalVeiculo;
  }
}
