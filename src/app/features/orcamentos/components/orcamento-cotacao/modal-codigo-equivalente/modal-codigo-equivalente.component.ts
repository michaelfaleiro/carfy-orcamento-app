import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CodigoEquivalente } from '../../../../../interfaces/cotacao/codigoEquivalente';
import { AdicionarCodigoEquivalenteRequest } from '../../../../../interfaces/cotacao/adicionarCodigoEquivalenteRequest';
import { ItemCotacao } from '../../../../../interfaces/cotacao/itemCotacao';
import { CommonModule } from '@angular/common';
import { Fabricante } from '../../../../../interfaces/item/fabricante';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal-codigo-equivalente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-codigo-equivalente.component.html',
  styleUrl: './modal-codigo-equivalente.component.css',
})
export class ModalCodigoEquivalenteComponent {
  @Input() itemId = '';
  @Output() close = new EventEmitter();
  item: ItemCotacao = {} as ItemCotacao;
  fabricantes: Fabricante[] = [];
  codigoEquivalente: CodigoEquivalente = {} as CodigoEquivalente;

  codigoEquivalenteForm = new FormGroup({
    sku: new FormControl(''),
    fabricanteId: new FormControl(''),
    tipoProdutoEquivalente: new FormControl(1),
  });

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarFabricantes();
    this.getItemById();
  }

  submit() {
    if (this.codigoEquivalente.id) {
      this.updateCodigoEquivalente();
    } else {
      this.create();
    }
  }

  getItemById() {
    this.cotacaoService.getItemCotacao(this.itemId).subscribe({
      next: (item) => {
        this.item = item;
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  create() {
    const codigoEquivalente: AdicionarCodigoEquivalenteRequest =
      this.criarCodigoEquivalente();

    this.cotacaoService
      .adicionarCodigoEquivalente(codigoEquivalente)
      .subscribe({
        next: () => {
          this.messageService.success(
            'Código equivalente adicionado com sucesso!'
          );
          this.resetForm();
          this.getItemById();
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  criarCodigoEquivalente() {
    return {
      itemId: this.item.id,
      cotacaoId: this.item.cotacaoId,
      fabricanteId: this.codigoEquivalenteForm.get('fabricanteId')?.value || '',
      sku: this.codigoEquivalenteForm.get('sku')?.value || '',
      fabricante: this.getDescricaoFabricante(),
      tipoProdutoEquivalente: Number(
        this.codigoEquivalenteForm.get('tipoProdutoEquivalente')?.value || 1
      ),
    };
  }

  editarCodigoEquivalente(codigoEquivalente: CodigoEquivalente) {
    this.codigoEquivalente = codigoEquivalente;
    this.codigoEquivalenteForm.patchValue({
      sku: codigoEquivalente.sku,
      fabricanteId: codigoEquivalente.fabricanteId,
      tipoProdutoEquivalente: codigoEquivalente.tipoProdutoEquivalente,
    });
  }

  updateCodigoEquivalente() {
    const codigoEquivalente: AdicionarCodigoEquivalenteRequest =
      this.criarCodigoEquivalente();
    codigoEquivalente.id = this.codigoEquivalente.id;
    this.cotacaoService
      .atualizarCodigoEquivalente(codigoEquivalente)
      .subscribe({
        next: () => {
          this.messageService.success(
            'Código equivalente atualizado com sucesso!'
          );
          this.resetForm();
          this.getItemById();
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  removerCodigoEquivalente(codigoEquivalente: CodigoEquivalente) {
    this.cotacaoService
      .removerCodigoEquivalente(
        this.item.cotacaoId,
        this.item.id,
        codigoEquivalente.id!
      )
      .subscribe({
        next: () => {
          this.messageService.success(
            'Código equivalente removido com sucesso!'
          );
          this.getItemById();
        },
        error: (error) => {
          this.messageService.error(error.error.errors[0]);
        },
      });
  }

  carregarFabricantes() {
    this.http
      .get<Fabricante[]>('../../../../../assets/dados/fabricanteProdutos.json')
      .subscribe({
        next: (fabricantes) => {
          this.fabricantes = fabricantes;
        },
        error: (error) => {
          this.messageService.error('Erro ao carregar fabricantes');
        },
      });
  }

  getDescricaoFabricante(): string {
    const fabricanteId = this.codigoEquivalenteForm.get('fabricanteId')?.value;
    const fabricante = this.fabricantes.find((f) => f.id === fabricanteId);
    return fabricante ? fabricante.fabricante : '';
  }

  resetForm() {
    this.codigoEquivalenteForm.reset();
  }

  closeModal() {
    this.close.emit();
  }
}
