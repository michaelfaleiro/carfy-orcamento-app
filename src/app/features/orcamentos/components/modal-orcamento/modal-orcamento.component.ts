import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { OrcamentoService } from '../../services/orcamento.service';
import { RegisterOrcamentoRequest } from '../../../../interfaces/orcamento/register-orcamento-request';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  catchError,
} from 'rxjs';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { ClienteService } from '../../../clientes/services/cliente.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Router, RouterLink } from '@angular/router';
import { Veiculo } from '../../../../interfaces/veiculo/veiculo';

@Component({
  selector: 'app-modal-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskPipe,
    NgxMaskDirective,
    RouterLink,
  ],
  templateUrl: './modal-orcamento.component.html',
  styleUrl: './modal-orcamento.component.css',
})
export class ModalOrcamentoComponent {
  clientes$ = new Observable<Cliente[]>();
  clienteSearch = new FormControl();

  @Input() orcamentoId: string = '';
  @Output() close = new EventEmitter();
  @Output() updateOrcamento = new EventEmitter();

  constructor(
    private clienteService: ClienteService,
    private orcamentoService: OrcamentoService,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchCliente();
  }

  searchCliente(): void {
    this.clientes$ = this.clienteSearch.valueChanges.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        if (searchTerm.trim() === '') {
          return of([]);
        } else {
          return this.clienteService
            .search(searchTerm)
            .pipe(catchError(() => of([])));
        }
      })
    );
  }

  submit() {}

  create(veiculo: Veiculo) {
    const orcamento: RegisterOrcamentoRequest = {
      clienteId: veiculo.clienteId,
      veiculoId: veiculo.id!,
      vendedor: 'Michael',
      status: 1,
    };
    this.orcamentoService.create(orcamento).subscribe({
      next: (orcamento) => {
        this.message.success('Orçamento criado com sucesso!');
        this.close.emit();
        this.updateOrcamento.emit();
        this.router.navigate(['/orcamento/' + orcamento.id]);
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  update() {}

  closeModal() {
    this.close.emit();
  }
}
