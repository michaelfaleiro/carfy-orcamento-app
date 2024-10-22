import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cotacao } from '../../../../../interfaces/cotacao/cotacao';
import { ItemCotacao } from '../../../../../interfaces/cotacao/itemCotacao';
import { PrecoItem } from '../../../../../interfaces/cotacao/precoItem';
import { MessageService } from '../../../../../shared/services/message/message.service';
import { CotacaoService } from '../../../../cotacoes/services/cotacao.service';
import { ModalItemCotacaoComponent } from '../modal-item-cotacao/modal-item-cotacao.component';
import { ModalCodigoEquivalenteComponent } from '../modal-codigo-equivalente/modal-codigo-equivalente.component';

@Component({
  selector: 'app-cotacao-venda-detalhes',
  standalone: true,
  imports: [
    CommonModule,
    ModalItemCotacaoComponent,
    ModalCodigoEquivalenteComponent,
  ],
  templateUrl: './cotacao-venda-detalhes.component.html',
  styleUrl: './cotacao-venda-detalhes.component.css',
})
export class CotacaoVendaDetalhesComponent {
  @Input() cotacaoId = '';
  @Output() close = new EventEmitter<void>();
  cotacao$ = new Observable<Cotacao>();
  itens: ItemCotacao[] = [];
  precos: PrecoItem[] = [];
  item: ItemCotacao = {} as ItemCotacao;
  descricaoItem = '';
  itemId = '';
  isModalItem = false;
  isModalCodigoEquivalente = false;

  constructor(
    private cotacaoService: CotacaoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCotacaoId();
  }

  getCotacaoId() {
    this.cotacao$ = this.cotacaoService.getCotacaoById(this.cotacaoId);
    this.cotacao$.subscribe({
      next: (cotacao) => {
        this.itens = cotacao.itens;
        this.limparDetalhesItem();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  removerItemCotacao(itemId: string): void {
    this.cotacaoService.removerItemCotacao(this.cotacaoId, itemId).subscribe({
      next: () => {
        this.messageService.success('Item removido com sucesso!');
        this.getCotacaoId();
        this.limparDetalhesItem();
      },
      error: (error) => {
        this.messageService.error(error.error.errors[0]);
      },
    });
  }

  editarItemCotacao(item: ItemCotacao): void {
    this.item = item;
    this.showModalItem();
  }

  showDetalhesItem(item: ItemCotacao): void {
    this.descricaoItem = item.descricao;
    this.precos = item.precos;
  }

  showCodigoEquivalente(item: ItemCotacao): void {
    this.itemId = item.id;
    this.showModalCodigoEquivalente();
  }

  showModalItem(): void {
    this.isModalItem = !this.isModalItem;
    if (!this.isModalItem) {
      this.item = {} as ItemCotacao;
    }
  }

  showModalCodigoEquivalente(): void {
    this.isModalCodigoEquivalente = !this.isModalCodigoEquivalente;
    if (!this.isModalCodigoEquivalente) {
      this.itemId = '';
    }
  }

  closeCotacaoVendaDetalhes(): void {
    this.close.emit();
  }

  limparDetalhesItem(): void {
    this.descricaoItem = '';
    this.precos = [];
  }
}
