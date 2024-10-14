import { Component } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { VeiculoService } from '../../services/veiculo.service';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../../interfaces/veiculo/veiculo';
import { CommonModule } from '@angular/common';
import { ModalVeiculoComponent } from '../modal-veiculo/modal-veiculo.component';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [CommonModule, ModalVeiculoComponent],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
})
export class VeiculosComponent {
  veiculos$ = new Observable<Veiculo[]>();
  veiculoId: string = '';
  isModalVeiculo = false;

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

  getAllVeiculos(): Observable<Veiculo[]> {
    return (this.veiculos$ = this.veiculoService.getAll());
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
}
