import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from '../../../../shared/services/message/message.service';
import { CotacaoService } from '../../services/cotacao.service';
import { PrecoItem } from '../../../../interfaces/cotacao/precoItem';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Fabricante } from '../../../../interfaces/item/fabricante';
import { AdicionarPrecoItemCotacaoRequest } from '../../../../interfaces/cotacao/adicionarPrecoItemCotacaoRequest';
import { Fornecedor } from '../../../../interfaces/item/fornecedor';
import { CommonModule } from '@angular/common';
import { ItemCotacao } from '../../../../interfaces/cotacao/itemCotacao';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-modal-preco-fornecedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './modal-preco-fornecedor.component.html',
  styleUrl: './modal-preco-fornecedor.component.css',
})
export class ModalPrecoFornecedorComponent {
  @Input() item: ItemCotacao = {} as ItemCotacao;
  @Input() precoItem: PrecoItem = {} as PrecoItem;
  @Input() itemDescricao = '';
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  fabricantes: Fabricante[] = [];
  fornecedores: Fornecedor[] = [];

  precoItemForm = new FormGroup({
    fornecedorId: new FormControl(''),
    fornecedor: new FormControl(''),
    fabricanteId: new FormControl(''),
    fabricante: new FormControl(''),
    quantidade: new FormControl(1),
    sku: new FormControl(''),
    descricao: new FormControl(''),
    valorCusto: new FormControl(0),
    valorVenda: new FormControl(0),
    prazoExpedicao: new FormControl(1),
    observacao: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarFornecedores();
    this.carregarFabricantes();
    this.precoItemForm.get('descricao')?.setValue(this.itemDescricao);
    if (this.precoItem.id) {
      this.precoItemForm.patchValue(this.precoItem);
    }
  }

  submit(): void {
    if (this.precoItem.id) {
      this.updatePrecoItem();
    } else {
      this.adicionarPrecoItem();
    }
  }

  adicionarPrecoItem(): void {
    const preco: AdicionarPrecoItemCotacaoRequest = this.criarPrecoItem();

    this.cotacaoService.adicionarPrecoItemCotacao(preco).subscribe({
      next: () => {
        this.messageService.success('Preço adicionado com sucesso');
        this.update.emit();
        this.closeModal();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  updatePrecoItem(): void {
    const preco: AdicionarPrecoItemCotacaoRequest = this.criarPrecoItem();
    preco.Id = this.precoItem.id;
    preco.cotacaoId = this.precoItem.cotacaoId;
    preco.itemId = this.precoItem.itemId;

    this.cotacaoService.atualizarPrecoItemCotacao(preco).subscribe({
      next: () => {
        this.messageService.success('Preço atualizado com sucesso');
        this.update.emit();
        this.closeModal();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  criarPrecoItem() {
    return {
      cotacaoId: this.item.cotacaoId,
      itemId: this.item.id,
      fornecedorId: this.precoItemForm.get('fornecedorId')?.value || '',
      fornecedor: this.getDescricaoFornecedor(),
      fabricanteId: this.precoItemForm.get('fabricanteId')?.value || '',
      fabricante: this.getDescricaoFabricante(),
      quantidade: Number(this.precoItemForm.get('quantidade')?.value),
      sku: this.precoItemForm.get('sku')?.value || '',
      descricao: this.precoItemForm.get('descricao')?.value || '',
      valorCusto: Number(this.precoItemForm.get('valorCusto')?.value),
      valorVenda: Number(this.precoItemForm.get('valorVenda')?.value),
      prazoExpedicao: this.precoItemForm.get('prazoExpedicao')?.value || 1,
      observacao: this.precoItemForm.get('observacao')?.value || '',
    };
  }

  carregarFabricantes() {
    this.http
      .get<Fabricante[]>('../../../../../assets/dados/fabricanteProdutos.json')
      .subscribe({
        next: (fabricantes) => {
          this.fabricantes = fabricantes;
        },
      });
  }

  getDescricaoFabricante(): string {
    const fabricanteId = this.precoItemForm.get('fabricanteId')?.value;
    const fabricante = this.fabricantes.find((f) => f.id === fabricanteId);
    return fabricante ? fabricante.fabricante : '';
  }

  carregarFornecedores(): void {
    this.http
      .get<Fornecedor[]>('../../../../../assets/dados/fornecedores.json')
      .subscribe({
        next: (fornecedores) => {
          this.fornecedores = fornecedores;
        },
      });
  }

  getDescricaoFornecedor(): string {
    const fornecedorId = this.precoItemForm.get('fornecedorId')?.value;
    const fornecedor = this.fornecedores.find((f) => f.id === fornecedorId);
    return fornecedor ? fornecedor.nomeFantasia : '';
  }

  closeModal(): void {
    this.close.emit();
  }
}
