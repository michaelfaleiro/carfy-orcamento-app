import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../../../../interfaces/veiculo/veiculo';
import { VeiculoService } from '../../services/veiculo.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../../../../interfaces/veiculo/marca';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-veiculo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-veiculo.component.html',
  styleUrl: './modal-veiculo.component.css',
})
export class ModalVeiculoComponent {
  veiculo$ = new Observable<Veiculo>();
  marcas: Marca[] = [];
  @Input() veiculoId: string = '';
  @Output() close = new EventEmitter();
  @Output() updateVeiculo = new EventEmitter();

  veiculoForm = new FormGroup({
    placa: new FormControl(''),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    ano: new FormControl(''),
    cor: new FormControl(''),
    chassi: new FormControl(''),
  });

  constructor(
    private veiculoService: VeiculoService,
    private message: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadMarcas();
    if (this.veiculoId) {
      this.getById(this.veiculoId);
    }
  }

  submit() {
    if (!this.veiculoForm.valid) {
      this.message.error('Formulário inválido!');
      return;
    }

    const veiculo: Veiculo = this.criarVeiculo();

    if (this.veiculoId) {
      veiculo.id = this.veiculoId;
      this.update(veiculo);
    } else {
      this.create(veiculo);
    }
  }

  create(veiculo: Veiculo) {
    this.veiculoService.create(veiculo).subscribe({
      next: () => {
        this.message.success('Veículo criado com sucesso!');
        this.updateVeiculo.emit();
        this.closeModal();
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  update(veiculo: Veiculo) {
    this.veiculoService.update(veiculo).subscribe({
      next: () => {
        this.message.success('Veículo atualizado com sucesso!');
        this.updateVeiculo.emit();
        this.closeModal();
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  getById(id: string) {
    this.veiculo$ = this.veiculoService.getById(id);
    this.veiculo$.subscribe({
      next: (veiculo) => {
        this.veiculoForm.patchValue(veiculo);
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  criarVeiculo(): Veiculo {
    return {
      placa: this.veiculoForm.value.placa || '',
      marca: this.veiculoForm.value.marca || '',
      modelo: this.veiculoForm.value.modelo || '',
      ano: this.veiculoForm.value.ano || '',
      cor: this.veiculoForm.value.cor || '',
      chassi: this.veiculoForm.value.chassi || '',
    };
  }

  loadMarcas(): void {
    this.http
      .get<Marca[]>('../../../../../assets/dados/marcaVeiculos.json')
      .subscribe((data) => {
        this.marcas = data;
      });
  }

  closeModal() {
    this.veiculoForm.reset();
    this.veiculo$ = new Observable<Veiculo>();
    this.veiculoId = '';
    this.close.emit();
  }
}
