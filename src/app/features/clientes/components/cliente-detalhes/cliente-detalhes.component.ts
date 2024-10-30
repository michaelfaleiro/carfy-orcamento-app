import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ModalVeiculoComponent } from '../../../veiculos/components/modal-veiculo/modal-veiculo.component';
import { Veiculo } from '../../../../interfaces/veiculo/veiculo';

@Component({
  selector: 'app-cliente-detalhes',
  standalone: true,
  imports: [CommonModule, NgxMaskPipe, ModalVeiculoComponent, RouterLink],
  templateUrl: './cliente-detalhes.component.html',
  styleUrl: './cliente-detalhes.component.css',
})
export class ClienteDetalhesComponent {
  clienteId = '';
  veiculoId = '';
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

  editarVeiculo(veiculo: Veiculo) {
    this.clienteId = veiculo.clienteId;
    this.veiculoId = veiculo.id!;
    this.showModalVeiculo();
  }

  showModalVeiculo() {
    this.isModalVeiculo = !this.isModalVeiculo;
  }
}
