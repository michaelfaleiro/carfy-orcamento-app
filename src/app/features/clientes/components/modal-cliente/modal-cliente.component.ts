import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cliente } from '../../../../interfaces/cliente/cliente';
import { ClienteService } from '../../services/cliente.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css',
})
export class ModalClienteComponent {
  cliente$ = new Observable<Cliente>();
  @Input() clienteId: string = '';
  @Output() close = new EventEmitter();
  @Output() updateCliente = new EventEmitter();

  clienteForm = new FormGroup({
    nomeRazaoSocial: new FormControl(''),
    nomeFantasia: new FormControl(''),
    cpfCnpj: new FormControl(''),
    rgIe: new FormControl(''),
    telefone: new FormControl(''),
    eTipoPessoa: new FormControl(1),
    email: new FormControl(''),
    observacao: new FormControl(''),
  });

  constructor(
    private clienteService: ClienteService,
    private message: MessageService
  ) {}

  ngOnInit() {
    if (this.clienteId) {
      this.getById(this.clienteId);
    }
  }

  submit() {
    if (!this.clienteForm.valid) {
      this.message.error('Formulário inválido!');
      return;
    }

    const cliente: Cliente = this.criarCliente();

    if (this.clienteId) {
      cliente.id = this.clienteId;
      this.update(cliente);
    } else {
      this.create(cliente);
    }
  }

  create(cliente: Cliente) {
    this.clienteService.create(cliente).subscribe({
      next: () => {
        this.message.success('Cliente criado com sucesso!');
        this.closeModal();
        this.updateCliente.emit();
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  update(cliente: Cliente) {
    this.clienteService.update(cliente).subscribe({
      next: () => {
        this.message.success('Cliente atualizado com sucesso!');
        this.closeModal();
        this.updateCliente.emit();
      },
      error: (error) => {
        this.message.error(error.error.errors[0]);
      },
    });
  }

  getById(id: string) {
    this.cliente$ = this.clienteService.getById(id);
    this.cliente$.subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue(cliente);
      },
      error: () => {
        this.message.error('Erro ao buscar cliente!');
      },
    });
  }

  criarCliente(): Cliente {
    return {
      nomeRazaoSocial: this.clienteForm.value.nomeRazaoSocial || '',
      nomeFantasia: this.clienteForm.value.nomeFantasia || '',
      cpfCnpj: this.clienteForm.value.cpfCnpj || '',
      rgIe: this.clienteForm.value.rgIe || '',
      telefone: this.clienteForm.value.telefone || '',
      eTipoPessoa: Number(this.clienteForm.value.eTipoPessoa || 1),
      email: this.clienteForm.value.email || '',
      observacao: this.clienteForm.value.observacao || '',
    };
  }

  closeModal() {
    this.clienteForm.reset();
    this.cliente$ = new Observable<Cliente>();
    this.clienteId = '';
    this.close.emit();
  }
}
